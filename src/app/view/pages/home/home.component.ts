import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeScore } from 'src/app/core/store/actions/score.actions';
declare let $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  played: boolean = false;
  showQuestion: boolean = false;
  speakingAnswer: number = -1;
  mcqAnswer: number = -1;
  score: number = 0;
  constructor(private store: Store<{ score: number }>) {}

  ngOnInit(): void {}

  startVideo(status: string) {
    $('video').get(0).play();
    $(status).fadeOut('slow');
    setTimeout(() => {
      if (!this.played) {
        this.played = true;
      }
      $('.retry').fadeIn('slow');
    }, $('video').get(0).duration * 1000);
  }
  checkSpeakingAnswer() {
    this.speakingAnswer = 1;
    this.setScore();
  }
  checkMcqAnswer(answer: string) {
    this.showQuestion = false;
    this.mcqAnswer = answer == 'a' ? 1 : 0;
    this.setScore();
  }
  setScore() {
    if (this.mcqAnswer == 1 && this.speakingAnswer == 1) this.score = 10;
    else if (this.mcqAnswer == 1) this.score = 5;
    else if (this.speakingAnswer == 1) this.score = 5;
    else if (this.mcqAnswer == 0 && this.speakingAnswer == 0) this.score = -10;
    else this.score == 0;
    $('.score').css('opacity', 1);
    setTimeout(() => {
      $('.score').css('opacity', 0);
    }, 1000);
    if (this.mcqAnswer == 1 && this.speakingAnswer == 1) this.score = 5;
    if (this.mcqAnswer) this.store.dispatch(changeScore({ score: this.score }));
  }
}
