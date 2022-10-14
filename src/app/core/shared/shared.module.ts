import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//modules
import { AntModule } from './modules/ant.module';
import { PrimengModule } from './modules/primeng.module';
@NgModule({
  declarations: [],
  imports: [
    AntModule,
    PrimengModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AntModule,
    PrimengModule,
  ],
})
export class SharedModule {}
