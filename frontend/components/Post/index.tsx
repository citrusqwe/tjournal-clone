import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import Image from 'next/image';
import { PostActions } from '../PostActions';
import styles from './Post.module.scss';
import Link from 'next/link';

interface PostProps {
  title: string;
  id: number;
  description: string;
  imageUrl?: string;
}

const Post: React.FC<PostProps> = ({ id, title, description, imageUrl }) => {
  return (
    <Paper elevation={0} className="p-20 mb-20">
      <Typography variant="h5" className={styles.title}>
        <Link href={`/news/${id}`}>{title}</Link>
      </Typography>
      <Typography className="mt-10 mb-15">{description}</Typography>
      {!imageUrl && <img src={imageUrl} width={600} height={400} alt={title} />}
      <PostActions />
    </Paper>
  );
};

export default Post;
