import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

//components
import { AppComponent } from './app.component';
import { FeedbackDialog } from './components/feedback/feedback.component';
import { HomeComponent } from './components/home/home.component';
  import { LoginComponent } from './components/home/login/login.component';
  import { RegistrationComponent } from './components/home/registration/registration.component';
  import { LogoutComponent } from './components/home/logout/logout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { MainComponent } from './components/main/main.component';
  import { QuestionsComponent } from './components/main/questions/questions.component';
  import { AskComponent } from './components/main/ask/ask.component';
  import { QuestionComponent } from './components/main/question/question.component';
    import { QuestionEditDialog } from './components/main/question/question.component';
    import { AnswerEditDialog } from './components/main/question/question.component';

//services
import { AuthGuard } from './services/auth.guard';
import { AllQuestionsResolver } from './services/allquestions.resolve.service';
import { SingleQuestionResolver } from './services/question.resolve.service';

const appRoutes = [
    { path: '', redirectTo: 'home/login', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, children: [
          { path:'', redirectTo: 'login', pathMatch: 'full' },
          { path: 'login', component: LoginComponent },
          { path: 'registration', component: RegistrationComponent }
      ] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'questions', component: MainComponent, canActivate: [AuthGuard], children: [
          { path: 'all', component: QuestionsComponent, resolve: { allQuestions: AllQuestionsResolver } },
          { path: 'ask', component: AskComponent },
          { path: ':id', component: QuestionComponent, resolve: { question: SingleQuestionResolver }}
      ] },
      { path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthGuard], resolve: { allQuestions: AllQuestionsResolver} },
      { path: 'logout', component: LogoutComponent },
      { path: '**', redirectTo: 'home/login' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes
            // { enableTracing: true }
        )
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard,
        AllQuestionsResolver,
        SingleQuestionResolver
    ]
})
export class AppRoutingModule { }