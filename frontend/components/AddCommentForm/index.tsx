import React from 'react';
import { Button, Input } from '@material-ui/core';
import styles from './AddCommentForm.module.scss';
import { Api } from '../../utils/api';
import { CommentItem } from '../../utils/api/types';

interface AddCommentFormProps {
  postId: number;
  onSuccesAdd: (comment: CommentItem) => void;
}

export const AddCommentForm: React.FC<AddCommentFormProps> = ({
  postId,
  onSuccesAdd,
}) => {
  const [clicked, setClicked] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [text, setText] = React.useState('');

  const onAddComment = async () => {
    try {
      setIsLoading(true);
      const comment = await Api().comment.create({
        postId,
        text,
      });
      onSuccesAdd(comment);
      setClicked(false);
      setText('');
    } catch (error) {
      console.warn('Add comment', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.form}>
      <Input
        disabled={isLoading}
        onFocus={() => setClicked(true)}
        value={text}
        onChange={(e) => setText(e.target.value)}
        minRows={clicked ? 5 : 1}
        classes={{ root: styles.fieldRoot }}
        placeholder="Написать комментарий"
        fullWidth
        multiline
      />
      {clicked && (
        <Button
          disabled={isLoading}
          onClick={onAddComment}
          className={styles.addButton}
          variant="contained"
          color="primary"
        >
          Опубликовать
        </Button>
      )}
    </div>
  );
};
