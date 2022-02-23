import { OutputData } from '@editorjs/editorjs';

export type LoginUserDto = {
  email: string;
  password: string;
};
export type CreateUserDto = {
  fullName: string;
} & LoginUserDto;

export type ResponseUser = {
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  token: string;
  commentsCount: number;
  updatedAt: string;
};

export type CreatePostDto = {
  title: string;
  body: OutputData['blocks'];
};

export type PostItem = {
  body: OutputData['blocks'];
  createdAt: string;
  id: number;
  description: string;
  tags: null | string;
  title: string;
  user: ResponseUser;
  updatedAt: string;
  views: number;
};

export type CommentItem = {
  id: number;
  text: string;
  post: PostItem;
  user: ResponseUser;
  createdAt: string;
  updatedAt: string;
};
