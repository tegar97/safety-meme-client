import React, { useState } from "react";
import Comment from "./post-comment";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { IconMessageDots } from "@irsyadadl/paranoid";

interface PostCardProps {
  post: {
    _id: string;
    content: string;
    imageUrl: string;
    createdBy: string;
    createdAt: string;
    isHateSpeech: boolean;
    userIp: string;
    comments: Array<{
      _id: string;
      content: string;
      createdBy: string;
      createdAt: string;
    }>;
  };
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [comments, setComments] = useState(post.comments);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [newCommentCreatedBy, setNewCommentCreatedBy] = useState("");

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    const newComment = {
      _id: (Math.random() * 100000).toString(), // This should be replaced with a proper ID generation mechanism
      content: newCommentContent,
      createdBy: newCommentCreatedBy,
      createdAt: new Date().toISOString(),
    };

    setComments([...comments, newComment]);
    setNewCommentContent("");
    setNewCommentCreatedBy("");
  };

  return (
    // redirect to the post page
    <Link key={post._id} href={`/post/${post._id}`}>
      <div className="border p-4 mb-4 rounded shadow cursor-pointer">
        <h3 className="text-lg md:text-xl font-bold">{post.content}</h3>
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt="Meme"
            className="mt-4 object-cover w-full"
          />
        )}
        <p className="text-xs md:text-sm text-gray-600 mt-4">
          Posted by {post.createdBy} on{" "}
          {new Date(post.createdAt).toLocaleString()}
        </p>
        {post.isHateSpeech && (
          <p className="text-red-500 text-sm md:text-base">
            ⚠️ This post contains hate speech
          </p>
        )}
        <div className="mt-4">
          <Badge variant={"secondary"}>
            <IconMessageDots />
            <span className="ml-2 text-xs md:text-sm">
              {comments.length} Comments
            </span>
          </Badge>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
