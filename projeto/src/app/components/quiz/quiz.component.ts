import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { quizz_questions } from '../../../assets/data/quizz_questions'

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit{
  title:string = 'titulo'

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string = ''

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  constructor(){}

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      console.log('total: '+ this.questionMaxIndex)
    }
   
    
  }
  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
    console.log(this.answers)
  }
  nextStep(){
    this.questionIndex += 1

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
    }
  }
  checkResult(answers:string[]){
    const result = answers.reduce((previous:string, current:string, i:number, arr:string[])=>{
      if(
        arr.filter(item => item === previous).length >
        arr.filter(item => item === previous).length
        ){
          return previous
        }else{
          return current
        }
    })
    return result
  }
}
