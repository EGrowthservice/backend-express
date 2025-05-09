import Project from '../models/project';
import { IProject } from '../types/project';
import FileService from './fileService';

class ProjectService {
  async createProject(data: Partial<IProject>, userId: string, file?: Express.Multer.File) {
    let fileUrl: string | undefined;
    if (file) {
      fileUrl = await FileService.uploadFile(file, 'carbon-uploads');
    }
    const project = new Project({ ...data, user: userId, fileUrl });
    return await project.save();
  }

  async getProjects(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const projects = await Project.find()
      .populate('user', 'name email')
      .skip(skip)
      .limit(limit);
    const total = await Project.countDocuments();
    return { projects, total, page, limit };
  }
}

export default new ProjectService();