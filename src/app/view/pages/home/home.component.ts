import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/app/core/environments/environment';
import { changeScore } from 'src/app/core/store/actions/score.actions';
import { AdminService } from '../admin/providers/admin.service';
import { SpeechService } from '../admin/providers/speech.service';
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
  video: any;
  questions: any;
  sentences: any;
  URL: string = environment.videoPath;
  test: any = 'what is your name';
  text: any;
  sentenceISCorrect!: boolean;
  constructor(
    private store: Store,
    private adminService: AdminService,
    public speech: SpeechService
  ) {
    this.speech.init();
  }

  ngOnInit(): void {
    this.adminService.GetVideo(6).subscribe({
      next: (data: any) => {
        this.video = data;
        this.questions = data.questions.$values;
        this.sentences = data.spokenSentences.$values;
      },
    });
  }

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

  startService(): void {
    this.speech.text = '';
    this.speech.start();
    this.speech.error = false;
  }
  stop(): void {
    this.text = this.speech.text.trim().split(' ');
    this.test = this.test.split(' ');

    this.sentenceISCorrect = this.text.every((el: string, i: number) => {
      return el == this.test[i];
    });
    this.speech.stop();
    this.speech.error = false;
  }
}
