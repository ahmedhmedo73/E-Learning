import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../providers/admin.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit {
  showQuistionsModal: boolean = false;
  showVideoModal: boolean = false;
  showAddQuistionModal: boolean = false;
  videoForm!: FormGroup;
  quistionForm!: FormGroup;
  selectedVideoIndex!: number;
  selectedVideoId!: number;
  video!: File;
  videos!: any;
  currentSectionPage!: string;
  selectedQuistionsList: any;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.videoForm = this.formBuilder.group({
      name: ['', Validators.required],
      files: ['', Validators.required],
    });

    this.quistionForm = this.formBuilder.group({
      Question: ['', Validators.required],
      Answer1: ['', Validators.required],
      Answer4: ['', Validators.required],
      Answer2: ['', Validators.required],
      Answer3: ['', Validators.required],
      CorrectAnswer: ['', Validators.required],
    });

    this.currentSectionPage =
      this.activatedRoute.snapshot.paramMap.get('sectionName') || '';
    this.getVideos();
  }

  getVideos() {
    this.adminService.GetVideo(this.currentSectionPage).subscribe({
      next: (data: any) => {
        this.videos = data.$values;
      },
    });
  }

  addVideo() {
    const formData = new FormData();
    formData.append('section', this.currentSectionPage);
    formData.append('name', this.videoForm.controls['name'].value);
    formData.append('files', this.video);

    this.adminService.AddVideo(formData).subscribe({
      next: (data) => {},
      error: (data) => {
        this.getVideos();
        this.showVideoModal = false;
      },
    });
  }

  addQuistion() {
    const formData = new FormData();
    formData.append('Question', this.quistionForm.controls['Question'].value);
    formData.append('Answer1', this.quistionForm.controls['Answer1'].value);
    formData.append('Answer2', this.quistionForm.controls['Answer2'].value);
    formData.append('Answer3', this.quistionForm.controls['Answer3'].value);
    formData.append('Answer4', this.quistionForm.controls['Answer4'].value);
    formData.append(
      'CorrectAnswer',
      this.quistionForm.controls['CorrectAnswer'].value
    );
    console.log(this.selectedVideoId);
    
    formData.append('Vid', this.selectedVideoId.toString());

    this.adminService.AddQuistion(formData).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }

  handleFile(event: any) {
    this.video = event.target.files[0];
  }

  deleteVideo(id: number) {
    this.adminService.DeleteVideo(id).subscribe({
      next: (data) => {},
      error: (err) => {
        this.getVideos();
      },
    });
  }
}
