export interface IProject {
    user: string;
    title: string;
    description: string;
    type: string;
    fileUrl?: string;
    status: 'pending' | 'approved' | 'rejected';
  }