import React, { useState} from 'react';
import { TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../redux/actions/A_Posts';

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);

  const handleComment = async () => {
    const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));
    setComment('');
    setComments(newComments);
  };

  return (
    <div>
      <div>
        <div >
          <h6>Write a comment</h6>
          <TextField  fullWidth variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
          <br />
          <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
            Comment
          </Button>
        </div>
        <div >
          <h4 className='m-3'>Comments</h4>
          {comments?.map((c, i) => (
            <p className='m-2' key={i}>
              <strong>{c.split(': ')[0]}:</strong>
              {c.split(':')[1]}
            </p>
          ))}
          </div>
      </div>
    </div>
  );
};

export default CommentSection;