import axios from 'axios';
import {
  GetServerSideProps,
  NextPageContext,
  GetServerSidePropsContext,
} from 'next';
import Cookies, { parseCookies } from 'nookies';
import { CommentApi } from './comment';
import { PostApi } from './post';
import { UserApi } from './user';

export type ApiReturnType = {
  user: ReturnType<typeof UserApi>;
  post: ReturnType<typeof PostApi>;
  comment: ReturnType<typeof CommentApi>;
};

export const Api = (
  ctx?: NextPageContext | GetServerSideProps
): ApiReturnType => {
  const cookies = ctx ? Cookies.get(ctx) : parseCookies();
  const token = cookies.tjtoken;

  const instance = axios.create({
    baseURL: 'http://localhost:7777',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // const apis = {
  //   user: UserApi,
  //   post: PostApi,
  // };

  // const result = Object.entries(apis).reduce((prev: any, [key, f]) => {
  //   return {
  //     ...prev,
  //     [key]: f(instance),
  //   };
  // }, {});

  // return result;

  return {
    user: UserApi(instance),
    post: PostApi(instance),
    comment: CommentApi(instance),
  };
};
