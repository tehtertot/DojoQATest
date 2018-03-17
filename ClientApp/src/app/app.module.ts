//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';

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
import { AllQuestionsResolver } from './services/allquestions.resolve.service';
import { SingleQuestionResolver } from './services/question.resolve.service';
import { UserService } from './services/user.service';
import { QuestionService } from './services/question.service';
import { LeaderboardService } from './services/leaderboard.service';
import { FeedbackService } from './services/feedback.service';
import { AuthGuard } from './services/auth.guard';
import { UserAuthInterceptor } from './services/userauth.interceptor';

//validators
import { EqualValidator } from './validators/equal.directive';

//pipes
import { TruncatePipe } from './pipes/truncate.pipe';
import { SearchFilterPipe } from './pipes/searchfilter.pipe';
import { StripHtmlPipe } from './pipes/stripHtml.pipe';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    FeedbackDialog,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    LogoutComponent,
    ProfileComponent,
    LeaderboardComponent,
    MainComponent,
    QuestionsComponent,
    AskComponent,
    QuestionComponent,
    QuestionEditDialog,
    AnswerEditDialog,
    EqualValidator,
    TruncatePipe,
    SearchFilterPipe,
    StripHtmlPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    QuillModule,
    RouterModule.forRoot([
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
    ])
  ],
  providers: [
    AuthGuard,
    UserService,
    QuestionService,
    LeaderboardService,
    FeedbackService,
    AllQuestionsResolver,
    SingleQuestionResolver,
    {provide: HTTP_INTERCEPTORS,
     useClass: UserAuthInterceptor,
     multi:true}
  ],
  entryComponents: [
    QuestionEditDialog,
    AnswerEditDialog,
    FeedbackDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
