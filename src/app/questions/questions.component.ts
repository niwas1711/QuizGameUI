import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { Question } from '../model/question';
import { Router, ActivatedRoute } from '@angular/router';
import { Score, ScoreStatus, ScoreState } from '..//model/score'
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ScoreService } from '../service/score.service';
import { GameService } from '../service/game.service';

@Component({
  selector: 'question-list',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  userIndex = 0;
  factor = 0;
  email: string;
  gameIdPassed: string;
  questions: Question[] = [];
  sub: any;
  scoreObject: Score;
  choice: String[];
  quizForm: FormGroup;
  lastButShow: boolean = false;
  prevButShow: boolean = false;


  constructor(public questionService: QuestionService,
    private gameService: GameService,
    private scoreService: ScoreService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder) {



  }
  initQuizForm() {
    this.quizForm = this.fb.group({
      answer: ''
    });
  }

  ngOnInit() {
    this.questionService.seconds = 0;
    this.questionService.qnProgress = 0;
    this.gameIdPassed = this.activedRoute.snapshot.params.id;
    //do this check again incase people press back button on browser.
   this.email = this.authService.currentUserValue.email;
   //TBD: Remove is commetns
    //check if the user has already played the game. If he has go to invite screen automatically
    /*this.scoreService.getMyScore(this.email, this.gameIdPassed).subscribe(data => {
      if(data){
        alert("You have already completed this Trivia. Redirecting back to dashboard?");
        this.router.navigate(['/dashboard']);
      }
    });*/

    this.gameService.getGameById(this.gameIdPassed).subscribe(game => {
      if(game){

        this.sub = this.questionService.getQuestions(this.gameIdPassed, game.questionCount)
        .subscribe(questions => {
          console.log(questions);
          this.questions = questions;
  
  
          //factor is used for % completed
          this.factor = 100 / this.questions.length;
  
          this.startTimer();
          this.scoreObject = new Score();
          this.scoreObject.gameId = this.gameIdPassed;
          this.scoreObject.email = this.authService.currentUserValue.email;
          this.scoreObject.score = 0;
          this.scoreObject.state = [];
          this.scoreObject.recommendations = [];
          for (let i = 0; i < this.questions.length; i++) {
            // this.scoreObject.state[i].questionId =  i.toString();
            // this.scoreObject.state[i].answerId =  '';
            console.log("RESET the answer state");
            this.scoreObject.state.push({ questionId: i.toString(), answerId: '' });
          }
          console.log("Init", this.scoreObject);
  
        });
      }
     
    });
   

  }

  startTimer() {
    this.questionService.timer = setInterval(() => {
      this.questionService.seconds++;
    }, 1000);
  }

  changeIndex(number) {

    if (this.userIndex > 0 && number < 0 ||  //index must be greater than 0 at all times
      this.userIndex < this.questions.length - 1 && number > 0) {
      // console.log("show question", this.userIndex);
      //index must be less than length of array
      //this.questionService.qns[this.userIndex].answer = choice;
      this.userIndex += number;
      console.log("userIndex=1", this.userIndex);
      this.lastButShow = false;
      //Hide the previous button on the first question. 
      if (this.userIndex < 1) {
        this.prevButShow = false;
      } else {
        this.prevButShow = true;
      }

      //show the submit button on the last button.
      if (this.userIndex == this.questions.length - 1) {
        this.lastButShow = true;
      }

      //this.scoreObject.state
    }
    else if (this.userIndex === this.questions.length - 1 && number > 0) { 
      //we are above this, we go to invite screen screen

      //this.userIndex += number;
      console.log("userIndex=2", this.userIndex);
      console.log("scoreObject state", this.scoreObject.state);
      //Check if all the answers are answered.
      for(let i=0; i < this.scoreObject.state.length;i++){
        console.log("answerid", this.scoreObject.state[i].answerId);
        if(this.scoreObject.state[i].answerId === ""){
          alert("Please answer all the questions. !!")
          return;
        }
      }
      //
      for (let i = 0; i < this.questions.length; i++) {
        let qId = this.questions[i]._id;
        let myItem = this.questions.find(item => item._id == qId);
        let chosenAnswer = this.scoreObject.state.find(item => item.questionId == qId);
       // console.log("myItem =", "Chosen answer =", myItem, chosenAnswer);
          myItem.answers.forEach((a, j) => {

            if (a.correct == true) {
              //console.log("we have correct answer", "qId=", qId, "j=", j, "chosen", chosenAnswer.answerId);

              if (j == Number(chosenAnswer.answerId)) {
                this.scoreObject.score++;
                console.log("SCORE =", this.scoreObject.score);
              }

            }

          });
         
        console.log("SCORE =", this.scoreObject.score, this.gameIdPassed);
       
      }
      this.scoreObject.timeTaken = this.questionService.timer;
      this.scoreService.addScore(this.scoreObject).subscribe(data => {
        clearInterval(this.questionService.timer);
        this.router.navigateByUrl('/invite/' + this.gameIdPassed);
      });
      
     
    }
  }

  answerKeyed(qId, choice) {
    this.scoreObject.state[this.userIndex].questionId = qId;
    this.scoreObject.state[this.userIndex].answerId = choice;

    console.log("Score Object state =", this.scoreObject.state);
    /*  let myItem = this.questions.find(item => item.id == qId);
     
      myItem.answers.forEach((a,j)=> {
      if(a.correct == true && a.id == choice)
      {
        console.log("we have correct answer", "qId=", qId, "j=", j, "choice=", choice); 
        this.scoreObject.score++;
      }
    });*/
    // this.userIndex ++;
    //  console.log("userIndex", this.userIndex, "score", this.scoreObject.score, this.questions.length);

    /*  if (this.userIndex >= this.questions.length){
        //load the score here
        this.scoreService.addScore(this.scoreObject);
        clearInterval(this.questionService.timer);
        this.router.navigate(['/invite']);
      
      } */
  }



}
