import { Component, inject } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-income-add',
  templateUrl: './income-add.component.html',
  styleUrl: './income-add.component.scss'
})
export class IncomeAddComponent {
  today = inject(NgbCalendar).getToday();
  model: NgbDateStruct | undefined;
}
