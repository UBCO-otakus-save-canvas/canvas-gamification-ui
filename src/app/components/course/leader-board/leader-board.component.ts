import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
    selector: 'app-leader-board',
    templateUrl: './leader-board.component.html',
    styleUrls: ['./leader-board.component.scss']
})
export class LeaderBoardComponent implements OnInit, AfterViewInit {

    @Input() leaderBoard: [{
        name: string,
        token: number,
    }];

    // Table data
    displayedColumns: string[] = ['name', 'token'];
    leaderBoardData: MatTableDataSource;
    @ViewChild(MatSort) matSort: MatSort;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.leaderBoardData = new MatTableDataSource(this.leaderBoard);
        this.leaderBoardData.sort = this.matSort;
    }
}
