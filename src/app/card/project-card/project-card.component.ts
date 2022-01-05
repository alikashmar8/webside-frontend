import { Component, Input, OnInit } from '@angular/core';
import { projectsMediaURL } from 'src/api-constants';
import { Project } from 'src/models/project.model';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent implements OnInit {
  @Input('project') project: Project;
  projectsMediaURL: string = projectsMediaURL;

  constructor() {}

  ngOnInit(): void {}
}
