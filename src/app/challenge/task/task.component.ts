import { Component, Input } from '@angular/core';
import { Task } from 'src/app/dashboard/tasks/models/task-model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Input() task!: Task
  
  constructor(
  ) { }




  showAnswer() {
    this.task.isAnswerVisible = true
  }


  
}
