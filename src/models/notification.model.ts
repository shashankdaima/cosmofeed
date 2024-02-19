import { v4 as uuidv4 } from 'uuid';
import moment from 'moment-timezone';
export class Notification {
  id: number;
  message: string;
  createdAt: string;

  constructor(message: string) {
    this.id = 0;
    this.message = message;
    this.createdAt =  moment().tz('Asia/Kolkata').format();
  }
}

