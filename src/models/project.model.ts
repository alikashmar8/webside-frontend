import { ProjectType } from 'src/enums/project-type.enum';

export class Project {
  id: string;
  name: string;
  description: string;
  url: string;
  is_done: boolean;
  type: ProjectType;
  image: any;
  createdAt: Date;
  updatedAt: Date;
}
