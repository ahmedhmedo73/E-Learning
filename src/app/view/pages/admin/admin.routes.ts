import { TutorialsComponent } from './tutorials/tutorials.component';
import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { UsersAccountsComponent } from './users-accounts/users-accounts.component';
import { VideosComponent } from './videos/videos.component';
import { QuestionsReportComponent } from './questions-report/questions-report.component';

export const AdminRoutes: Routes = [
  {
    path: 'admin',
    component: IndexComponent,
    children: [
      { path: 'tutorials', component: TutorialsComponent },
      { path: 'user-accounts', component: UsersAccountsComponent },
      { path: 'questions-report', component: QuestionsReportComponent },
      { path: 'video/:sectionName', component: VideosComponent },
    ],
  },
];
