export interface Post {
    id: number;
    title: string;
    subtitle: string;
    text: string;
    author: string;
    avatar?: string;
    likes: number;
    date: string;
}
