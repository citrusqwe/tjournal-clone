import React from 'react';
import Link from 'next/link';
import styles from './SideComments.module.scss';
import { PostItem, ResponseUser } from '../../utils/api/types';
import { Avatar } from '@material-ui/core';

interface CommentItemProps {
  user: ResponseUser;
  text: string;
  post: PostItem;
  createdAt: any;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  user,
  text,
  post,
}) => {
  return (
    <div className={styles.commentItem}>
      <div className={styles.userInfo}>
        <Avatar style={{ marginRight: 10 }}>{user?.fullName[0]}</Avatar>
        <Link href={`/profile/${user.id}`}>
          <a>
            <b>{user.fullName}</b>
          </a>
        </Link>
      </div>
      <p className={styles.text}>{text}</p>
      <Link href={`/news/${post.id}"`}>
        <a href="#">
          <span className={styles.postTitle}>{post.title}</span>
        </a>
      </Link>
    </div>
  );
};
