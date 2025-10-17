import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  taskArray: any[] = [];
  editIndex: number | null = null;
  editedTask: any = { taskName: '', description: '', status: 'Planned' };
  darkMode: boolean = false;

  ngOnInit(): void {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) this.taskArray = JSON.parse(savedTasks);

    const savedTheme = localStorage.getItem('theme');
    this.darkMode = savedTheme === 'dark';
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
  
    if (this.editIndex !== null) {
      this.taskArray[this.editIndex] = {
        ...this.taskArray[this.editIndex],
        taskName: this.editedTask.taskName,
        description: this.editedTask.description,
      };
      this.editIndex = null;
    } else {
      this.taskArray.push({
        taskName: this.editedTask.taskName,
        description: this.editedTask.description,
        status: 'Planned',
        isCompleted: false,
      });
    }
  
    this.saveTasks();
    form.reset();
    this.editedTask = { taskName: '', description: '', status: 'Planned' };
  }  

  onDelete(task: any) {
    this.taskArray = this.taskArray.filter(t => t !== task);
    this.saveTasks();
  }

  onEdit(task: any) {
    const index = this.taskArray.indexOf(task);
    if (index !== -1) {
      this.editIndex = index;
      this.editedTask = { ...task };
    }
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.taskArray));
  }

  getTasksByStatus(status: string) {
    return this.taskArray.filter(task => task.status === status);
  }
}
