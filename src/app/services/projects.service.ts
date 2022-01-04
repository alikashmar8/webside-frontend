import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { projectsEndpoint } from '../api-constants';
import { CreateProjectDTO } from 'src/dtos/create-project.dto';
import { Project } from 'src/models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  getAllProjects(): any {
    return this.http.get(projectsEndpoint).toPromise();
  }

  getProjectById(id: string) {
    return this.http.get(projectsEndpoint + id).toPromise();
  }

  storeProjects(data: CreateProjectDTO) {
    //TODO: Send authorization token
    return this.http.post(projectsEndpoint, { data }).toPromise();
  }
}
