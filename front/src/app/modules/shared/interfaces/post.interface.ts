export interface Post {
  id: string;
  title: string;
  subtitle: string;
  text: string;
  author: string;
  avatar?: string;
  likes?: number;
  date: string;
  tags?: string[];
}

export interface PostRequest {
  title: string;
  subtitle: string;
  text: string;
  author?: string;
}
