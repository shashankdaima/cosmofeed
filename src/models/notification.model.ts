import { v4 as uuidv4 } from 'uuid';

export class Notification {
  id: string;
  message: string;
  createdAt: Date;

  constructor(message: string) {
    this.id = uuidv4();
    this.message = message;
    this.createdAt = new Date();
  }
}

