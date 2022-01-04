import { ProjectType } from "src/enums/project-type.enum";

export class CreateProjectDTO{
  name:string;
  description:string;
  url: string;
  is_done: boolean;
  type: ProjectType;
  image: any;
}
