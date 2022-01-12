export interface Post {
  id: number;
  title: string;
  subtitle: string;
  text: string;
  author: {
    name: string;
  };
  avatar?: string;
  likes: number;
  date: string;
  tags?: string[];
}
