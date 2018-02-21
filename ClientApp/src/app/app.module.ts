//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

//components
import { AppComponent } from './app.component';
  import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
  import { LogoutComponent } from './components/home/logout/logout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { MainComponent } from './components/main/main.component';
  import { QuestionsComponent } from './components/main/questions/questions.component';
  import { AskComponent } from './components/main/ask/ask.component';
  import { QuestionComponent } from './components/main/question/question.component';

//services
import { AllQuestionsResolver } from './services/allquestions.resolve.service';
import { SingleQuestionResolver } from './services/question.resolve.service';
import { UserService } from './services/user.service';
import { QuestionService } from './services/question.service';
import { LeaderboardService } from './services/leaderboard.service';
import { AuthGuard } from './services/auth.guard';
import { UserAuthInterceptor } from './services/userauth.interceptor';

//validators
import { EqualValidator } from './validators/equal.directive';

//pipes
import { TruncatePipe } from './pipes/truncate.pipe';
import { SearchFilterPipe } from './pipes/searchfilter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LogoutComponent,
    ProfileComponent,
    LeaderboardComponent,
    MainComponent,
    QuestionsComponent,
    AskComponent,
    QuestionComponent,
    EqualValidator,
    TruncatePipe,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'questions', component: MainComponent, canActivate: [AuthGuard], children: [
          { path: 'all', component: QuestionsComponent, resolve: { allQuestions: AllQuestionsResolver } },
          { path: 'ask', component: AskComponent },
          { path: ':id', component: QuestionComponent, resolve: { question: SingleQuestionResolver }}
      ] },
      { path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthGuard] },
      { path: 'logout', component: LogoutComponent },
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [
    UserService,
    AuthGuard,
    QuestionService,
    AllQuestionsResolver,
    SingleQuestionResolver,
    {provide: HTTP_INTERCEPTORS,
     useClass: UserAuthInterceptor,
     multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
