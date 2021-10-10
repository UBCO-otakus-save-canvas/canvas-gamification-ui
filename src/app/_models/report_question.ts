export interface ReportQuestion {
    user_id: number;
    question_id: number;
    report_timestamp: Date;
    unclear_description: boolean;
    test_case_incorrect_answer: boolean;
    test_case_violate_constraints: boolean;
    poor_test_coverage: boolean;
    language_specific_issue: boolean;
    other: boolean;
    report_text: string;
}

