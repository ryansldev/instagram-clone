type Comment = {
  commentedAt: Date | string;
  content: string;
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