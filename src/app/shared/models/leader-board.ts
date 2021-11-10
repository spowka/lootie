export class LeaderBoardModel {
  _id?: string;
  startDate: string;
  endDate: string;
  data?: LeaderBoardDataItem[];
  topdrops?: LeaderBoardDataItem[];
}

export interface LeaderBoardDataItem {
  user?: LeaderBoardUser;
  points: number;
  ranking: number;
  item?: LeaderBoardItem;
}

export interface LeaderBoardItem {
  color: string;
  image: string;
  name: string;
  tag: string;
  thumbnail: string;
  type: string;
  value: number;
  _id: string;
}

export interface LeaderBoardUser {
  _id: string;
  profileImageUrl: string;
  username: string;
}
