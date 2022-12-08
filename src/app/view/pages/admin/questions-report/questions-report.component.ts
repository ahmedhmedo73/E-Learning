import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionAnswersService } from 'src/app/core/services/questions-report/questions-report.service';
import * as moment from 'moment';
@Component({
  selector: 'app-questions-report',
  templateUrl: './questions-report.component.html',
  styleUrls: ['./questions-report.component.scss'],
})
export class QuestionsReportComponent implements OnInit {
  form!: FormGroup;
  questionsAnswers: any[] = [];
  moment: any = moment;
  heads: string[] = [
    '#',
    'Id',
    'Question',
    'Correct Answer',
    "User's Answer",
    'Is Correct',
    'Answer time',
  ];
  chartOptions = {
    animationEnabled: true,
    title: {
      text: 'Project Cost Breakdown',
    },
    data: [
      {
        type: 'doughnut',
        yValueFormatString: "#,###.##'%'",
        indexLabel: '{name}',
        dataPoints: [
          { y: 28, name: 'Labour' },
          { y: 10, name: 'Legal' },
        ],
      },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private questionAnswersService: QuestionAnswersService
  ) {}

  ngOnInit(): void {
    this.createform();
    this.getReport();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      id: [2, Validators.required],
    });
  }

  getReport(): void {
    this.questionAnswersService
      .GetQuestionAnswersForUser(this.form.get('id')?.value)
      .subscribe({
        next: (data: any) => {
          this.questionsAnswers = data.$values;
          this.questionsAnswers = this.questionsAnswers.filter(
            (data: Object) => {
              return 'id' in data;
            }
          );
        },
      });
  }
}
