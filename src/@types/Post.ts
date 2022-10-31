export type AnswerType = {
  likes: number;
  answeredAt: Date | string;
  content: string;
}

export type Comment = {
  commentedAt: Date | string;
  content: string;
  likes: number;
  answers: AnswerType[];
}

export type PostType = {
  id?: string;
  author: string;
  username: string;
  title: string;
  likes: number;
  photo: string;
  postedAt: Date;
  comments?: Comment[];
}