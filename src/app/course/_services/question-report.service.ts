import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Question, User} from '@app/_models';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ApiService} from "@app/_services/api.service";
import {QuestionReport} from "@app/_models/question_report";

@Injectable({
    providedIn: 'root'
})
export class QuestionReportService {
    constructor(
        private http: HttpClient,
        private apiService: ApiService) {
    }

    getReport(userId: number, questionId: number): Observable<QuestionReport> {
        const url = this.apiService.getURL('question-report', 'get-report');
        const params = new HttpParams()
            .set('question', String(questionId))
            .set('user', String(userId));
        return this.http
            .get<QuestionReport>(url, {params})
            .pipe(catchError(this.apiService.handleError<QuestionReport>('Error occurred while fetching a report')));
    }

    sendReport(data: { user: number, question: number, report: string, report_details: string }): Observable<QuestionReport> {
        const url = this.apiService.getURL('question-report');
        return this.http
            .post<QuestionReport>(url, data)
            .pipe(catchError(this.apiService.handleError<QuestionReport>('Error occurred while creating a report')));
    }

    deleteReport(userId: number, questionId: number): Observable<QuestionReport> {
        const url = this.apiService.getURL('question-report', 'delete-report');
        const params = new HttpParams()
            .set('question', String(questionId))
            .set('user', String(userId));
        return this.http
            .delete<QuestionReport>(url, {params})
            .pipe(catchError(this.apiService.handleError<QuestionReport>('Error occurred while fetching a report')));
    }
}
