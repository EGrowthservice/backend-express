export interface IConsultation {
    user: string;
    topic: string;
    message: string;
    status: 'pending' | 'completed' | 'cancelled';
  }