import { User } from 'src/app/auth/models/user-profile';

export class ChatMessage {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  text: string;
  sender: User;
  room: string;
}
