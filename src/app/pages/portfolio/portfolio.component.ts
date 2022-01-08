import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { ProjectType } from 'src/enums/project-type.enum';
import { Project } from 'src/models/project.model';
import { projectsMediaURL } from '../../../api-constants';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  isLoading: boolean = false;
  projectsMediaURL: string = projectsMediaURL;

  isAllClicked: boolean = true;
  isWebsitesClicked: boolean = false;
  isDesignsClicked: boolean = false;

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
      this.filteredProjects = this.projects;
      // after we got our data we will stop loading animation
      this.isLoading = this.loadingService.appLoading(false);
    } catch (err) {
      // TODO: Handle err
      this.isLoading = this.loadingService.appLoading(false);
    }
  }

  allClicked() {
    this.isAllClicked = true;
    this.isWebsitesClicked = false;
    this.isDesignsClicked = false;
    this.filteredProjects = this.projects;
  }

  websitesClicked() {
    this.isAllClicked = false;
    this.isWebsitesClicked = true;
    this.isDesignsClicked = false;
    this.filteredProjects = this.projects.filter(
      (project) => project.type == ProjectType.WEBSITE
    );
  }

  designsClicked() {
    this.isAllClicked = false;
    this.isWebsitesClicked = false;
    this.isDesignsClicked = true;
    this.filteredProjects = this.projects.filter(
      (project) => project.type == ProjectType.DESIGN
    );
  }
}
