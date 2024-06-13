// Comment.tsx
import React from 'react';

interface CommentProps {
  comment: {
    _id: string;
    content: string;
    createdBy: string;
    createdAt: string;
  };
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div key={comment._id} className="border-t mt-2 pt-2">
      <p>{comment.content}</p>
      <p className="text-xs text-gray-500">Commented by {comment.createdBy} on {new Date(comment.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default Comment;
