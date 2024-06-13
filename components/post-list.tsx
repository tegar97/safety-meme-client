"use client";
import React from "react";
import PostCard from "./post-card";
interface Post {
  _id: string;
  content: string;
  imageUrl: string;
  createdBy: string;
  createdAt: string;
  isHateSpeech: boolean;
  userIp: string;
  comments: {
    _id: string;
    content: string;
    createdBy: string;
    createdAt: string;
  }[];
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="mt-8 w-full max-w-2xl">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
