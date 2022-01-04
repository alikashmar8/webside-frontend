import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { Project } from 'src/models/project.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];
  isLoading: boolean = false;

  constructor(
    private projectsService: ProjectsService,
    private loadingService: LoadingService
  ) {}

  async ngOnInit(): Promise<void> {
    //  we will start loading animation until we get the data we want from backend
    this.isLoading = this.loadingService.appLoading(true);

    // open try catch block in case the server responded with an error instead of data
    try {
      // get data from backend and store it in variable
      this.projects = await this.projectsService.getAllProjects();

      // after we got our data we will stop loading animation
      this.isLoading = this.loadingService.appLoading(false);
    } catch (err) {
      // TODO: Handle err
    }
  }
}
