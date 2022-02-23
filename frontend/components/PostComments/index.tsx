import React from 'react';
import { Comment } from '../Comment';
import { Divider, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import { AddCommentForm } from '../AddCommentForm';
import { Api } from '../../utils/api';
import { CommentItem } from '../../utils/api/types';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';
import { useComments } from '../../hooks/useComments';

interface PostCommentsProps {
  postId: number;
}

export const PostComments: React.FC<PostCommentsProps> = ({ postId }) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const userData = useAppSelector(selectUserData);

  const { comments, setComments } = useComments(postId);

  const onAddComment = (comment: CommentItem) => {
    setComments((prev) => [comment, ...prev]);
  };
  const onRemoveComment = (id: number) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  };

  return (
    <Paper elevation={0} className="mt-40 p-30">
      <div className="container">
        <Typography variant="h6" className="mb-20">
          42 комментария
        </Typography>
        <Tabs
          className="mt-20"
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Популярные" />
          <Tab label="По порядку" />
        </Tabs>
        <Divider />
        {userData && (
          <AddCommentForm onSuccesAdd={onAddComment} postId={postId} />
        )}
        <div className="mb-20" />
        {comments?.map((obj) => (
          <Comment
            key={obj.id}
            id={obj.id}
            user={obj.user}
            text={obj.text}
            createdAt={obj.createdAt}
            currentUserId={userData?.id}
            onRemove={onRemoveComment}
          />
        ))}
      </div>
    </Paper>
  );
};
