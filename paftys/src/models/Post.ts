export default interface Post {
  content: {
    text: string;
    images?: string[];
  };
  _id: string;
  repliesTo?: string;
  likes: string[];
  replies: string[];
  reports: number;
  tags: string[];
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  userData: {
    _id: string;
    userName: string;
    profilePicture: string;
    biography: string;
  };
}
