import {ComponentFixture, TestBed} from '@angular/core/testing';

import {McqCreateSnippetComponent} from '../../problem-create/mcq-create-snippet/mcq-create-snippet.component';
import {TestModule} from '@test/test.module';
import {CategoryService} from "@app/_services/api/category.service";
import {CategoryServiceMock} from "@test/category.service.mock";
import {CourseServiceMock} from "@test/course.service.mock";
import {MOCK_CATEGORIES, MOCK_COURSE, MOCK_COURSE_EVENT} from "@app/problems/_test/mock";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {CkEditorComponent} from "@app/problems/ck-editor/ck-editor.component";
import {JsonEditorComponent} from "@app/problems/json-editor/json-editor.component";
import {ReactiveFormsModule} from "@angular/forms";
import {QuestionService} from "@app/problems/_services/question.service";
import {QuestionServiceMock} from "@app/problems/_test/_services/question.service.mock";
import {CourseService} from "@app/course/_services/course.service";
import {Router} from "@angular/router";
import {TuiNotificationsService} from "@taiga-ui/core";
import {of} from "rxjs";

describe('McqCreateSnippetComponent', () => {
    let component: McqCreateSnippetComponent;
    let fixture: ComponentFixture<McqCreateSnippetComponent>;
    let router: Router;
    let notificationService: TuiNotificationsService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule, CKEditorModule, ReactiveFormsModule],
            declarations: [McqCreateSnippetComponent, CkEditorComponent, JsonEditorComponent],
            providers: [
                {provide: CategoryService, useClass: CategoryServiceMock},
                {provide: CourseService, useClass: CourseServiceMock},
                {provide: QuestionService, useClass: QuestionServiceMock}
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        notificationService = TestBed.inject(TuiNotificationsService);
        spyOn(notificationService, 'show').and.callFake(() => {
            return of();
        });
        router = TestBed.inject(Router);
        spyOn(router, 'navigate');
        fixture = TestBed.createComponent(McqCreateSnippetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set courses and categories', () => {
        expect(component.courses).toEqual([MOCK_COURSE]);
        expect(component.categories).toEqual(MOCK_CATEGORIES);
    });

    it('should add and remove choice/answer', () => {
        expect(component.correctAnswers.length).toEqual(1);
        expect(component.distractors.length).toEqual(1);

        component.addChoice();
        component.addAnswer();
        expect(component.correctAnswers.length).toEqual(2);
        expect(component.distractors.length).toEqual(2);

        component.removeChoice(1);
        component.removeAnswer(1);
        expect(component.correctAnswers.length).toEqual(1);
        expect(component.distractors.length).toEqual(1);
    });

    it('should create mcq', () => {
        component.checkBox = false;
        component.onSubmit();
        expect(notificationService.show).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledOnceWith(['problems', 'create', 'MCQ']);
    });

    it('should create checkbox question', () => {
        component.checkBox = true;
        component.onSubmit();
        expect(notificationService.show).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledOnceWith(['problems', 'create', 'checkbox']);
    });

    it('should set the course', () => {
        component.setCourse(0);
        expect(component.events).toEqual(MOCK_COURSE.events);
        expect(component.form.event.value).toBeNull();
    });

    it('should set the event', () => {
        component.setEvent(1);
        expect(component.form.event.value).toEqual(MOCK_COURSE_EVENT.id);
    });

    it('should be invalid if required fields are empty', () => {
        expect(fixture.debugElement.nativeElement.querySelector('#submit').disabled).toBeTruthy();
    });

    it('should be invalid if MCQ does not have all required data', () => {
        expect(component.isSubmissionValid()).toBeFalsy();
    });

    it('should be invalid if checkbox fields are invalid', () => {
        component.isPractice = true;
        component.form.course.setValue(MOCK_COURSE);
        component.form.event.setValue(MOCK_COURSE_EVENT);
        fixture.detectChanges();
        expect(component.isSubmissionValid()).toBeFalsy();
    });

    it('should be valid if all MCQ required fields are filled', () => {
        component.checkBox = false;
        component.form.title.setValue('Test');
        component.form.difficulty.setValue('Easy');
        component.form.category.setValue('Test');
        component.form.visible_distractor_count.setValue('Test');
        component.form.course.setValue(MOCK_COURSE);
        component.form.event.setValue(MOCK_COURSE_EVENT);
        component.answerText = 'Test';
        component.distractors.push({text: ''});
        component.questionText = 'Test';
        fixture.detectChanges();
        expect(component.isSubmissionValid()).toBeTruthy();
    });

    it('should be valid if all checkbox required fields are filled', () => {
        component.checkBox = true;
        component.form.title.setValue('Test');
        component.form.difficulty.setValue('Easy');
        component.form.category.setValue('Test');
        component.form.visible_distractor_count.setValue('Test');
        component.form.course.setValue(MOCK_COURSE);
        component.form.event.setValue(MOCK_COURSE_EVENT);
        component.correctAnswers.push({text: ''});
        component.distractors.push({text: ''});
        component.questionText = 'Test';
        fixture.detectChanges();
        expect(component.isSubmissionValid()).toBeTruthy();
    });

    // TODO - Determine how to test this.
    // it('click practice checkbox', () => {
    //     fixture.debugElement.nativeElement.querySelector('#practiceCheckbox').click();
    //     fixture.detectChanges();
    //     expect(component.isPractice).toBeTruthy();
    // });
});
