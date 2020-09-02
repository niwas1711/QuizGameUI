import { Component, OnInit } from '@angular/core';
import { Score } from '../model/score';
import { ScoreService } from '../service/score.service';
import { map } from 'rxjs/operators';
import { GameService } from '../service/game.service';
import { Game, GameStatus } from '..//model/game';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { QuestionsComponent } from '../questions/questions.component';
import { AddQuestionComponent } from '../questions/add/addquestion.component';
import { AddgameComponent } from '../addgame/addgame.component';
import { ShowquestionsComponent } from '../questions/showquestions/showquestions.component';
import { QuestionService } from '../service/question.service';


export interface LeaderBoard {
  name: string;
  position: number;
  score: number;
  time: string;
}
const scores: LeaderBoard[] = [
  {position: 1, name: 'Niwas Shashi', score: 7, time: '66 min'},
  {position: 2, name: 'Padmavathi Ramachandra', score: 6, time: '23 min'},
  {position: 3, name: 'Sudheer Mangalpady', score: 4, time: '63 min'},
  ];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  displayedWinnerColumns: string[] = ['position', 'name', 'score', 'time'];
  displayedMyColumns: string[] = ['gameId', 'score'];
  dataSource: Score[] = [];
  games: Game[] = [];
  isCreator: boolean = false;
  isPlayer: boolean = true;
  isAdmin: boolean = false;
  gameInPlay = "1";
  gameCompleted = "2";
  gameCreated = "0";
  email: string = '';
  myScores: Score[] = [];
  allScores: Score[] = [];

  winners: Score[] = [];

  constructor(private scoreService: ScoreService,
    private gameService: GameService,
    private questionService: QuestionService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.email = this.authService.currentUserValue.email;

   this.getGames();

   /* this.scoreService.getTopScores().subscribe(data => {
      console.log("dashboard", data);
      this.dataSource = data;
    });*/

   
    console.log(this.authService.isCreator);
    this.isCreator = this.authService.isCreator;
    this.isAdmin = this.authService.isAdmin;
  }
  getScores(){
    this.scoreService.getMyScores(this.email).subscribe(data => {
      console.log("myscores", data);
      this.myScores = data;
      for(let i = 0; i < this.myScores.length; i ++){
        this.myScores[i].gameId = this.games.find(item => item._id == this.myScores[i].gameId).gameName;
      }
    });
  }
  getGames(){
    this.gameService.getGames().subscribe(games => {
      console.log("games", games);
      this.games = games;
      this.getScores();
      console.log(this.gameInPlay, this.gameCompleted);
    });
  }

  startGame(game:Game){
   
    this.questionService.getQuestions(game._id, -1).subscribe(result => {
      console.log("Start game", game._id, result.length, game.questionCount, result);
      if (result.length >= game.questionCount){
        console.log("startGame");
        game.status = this.gameInPlay.toString();
        this.gameService.updateGame(game, game._id).subscribe(result =>{
          
          console.log("Game started");
        });
      } else {
        alert("Added questions = " + result.length + '. Expected questions = ' + game.questionCount + ". Please add more questions");
      }
      
  });
    
  }

  addCreator(){
    this.router.navigateByUrl('admin/creators/add');
  }

  editGame(game:Game){
    const gameDialogRef = this.dialog.open(AddgameComponent, {

      width: "600px",
      height: "500px",
      data: {game: game}
    });
    gameDialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result:`, result); // Pizza!
      this.getGames();
      
    // this.dialogRef.close();
      });
  }

  deleteGame(game:Game){
    console.log("delete game", game._id);
    if(confirm("Are you sure to delete "+ game.gameName)) {
      this.gameService.deleteGame(game._id).subscribe(result => {
        this.getGames();
      });
      
    }
   
  }

  endGame(game: Game){
    console.log("end game", game);
    game.status = this.gameCompleted.toString();
    this.gameService.updateGame(game, game._id).subscribe(result =>{
      
      console.log("Game completed");
    });
  }

  addQuestion(game:Game){
    let questionDialogRef = this.dialog.open(AddQuestionComponent, {
      width: "600px",
      height: "500px",
      data :{game:game}
    });

    questionDialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result:`, result); // Pizza!
      
    // this.dialogRef.close();
      });
    
  }

  showQuestions(game: Game){
    console.log("show questions", game);
    const questionDialogRef = this.dialog.open(ShowquestionsComponent, {
      width: "600px",
      height: "500px",
      data: {game: game}
    });
  
  }

  showWinners(game: Game){
    console.log("show winners");
    this.scoreService.getWinners(game._id, 10).subscribe(res =>
      {
        this.winners = res;
        console.log("winners", this.winners);
      });
  }

  createGame(){
    let gameDialogRef = this.dialog.open(AddgameComponent, {
      disableClose: false,
      width: "600px",
      height: "500px"
    });
    gameDialogRef.afterClosed().subscribe(result => {
      
      console.log(`Dialog result:`, result); // Pizza!
      this.getGames();
      
    // this.dialogRef.close();
      });
    //gameDialogRef.close();
    //this.router.navigate(['/dashboard']);
  }

  playGame(game: Game){
    let email = this.authService.currentUserValue.email;
    //check if the user has already played the game. If he has go to invite screen automatically
    this.scoreService.getMyScore(email, game._id).subscribe(data => {
      // TBD Remove this comments.
        if(data){
        alert("You have already completed this Trivia. Please check your score?");
       // this.router.navigate(['/dashboard']);
      } else
      {
        let url = '/questions/' + game._id;
        this.router.navigateByUrl(url);
      }
    },err => {
        let url = '/questions/' + game._id;
        this.router.navigateByUrl(url);
    });
   
  }
}
