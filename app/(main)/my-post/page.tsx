"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface Post {
  _id: string;
  content: string;
  imageUrl: string;
  createdBy: string;
  createdAt: string;
  isHateSpeech: boolean;
  userIp: string;
}

function Page() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const userId = localStorage.getItem("guestId");

    if (!userId) {
      console.error("User ID not found in localStorage.");
      return;
    }

    try {
      const response = await axios.get(
        `https://safety.akutegar.com/api/posts/me?userId=${userId}`
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  if (posts.length === 0)
    return (
      <main className="xl:col-span-2 sm-col-span-1 md:col-span-3 border px-4 py-4 ">
        {" "}
        <h1 className="text-2xl font-semibold mb-4">My Posts</h1>{" "}
        <p className="text-2xl font-semibold">No posts found</p>
      </main>
    );
  return (
    <main className="xl:col-span-2 sm-col-span-1 md:col-span-3 border px-4 py-4 ">
      <h1 className="text-lg md:text-2xl font-semibold mb-4">My Posts</h1>

      <Card className="border-none bg-none bg-transparent ">
        <CardContent>
          <div className="grid grid-cols-2 gap-4 ">
            <div className="flex flex-col gap-1 border-r-2">
              <h2 className="text-base md:text-lg font-medium">
                Total Posts 🥳
              </h2>
              <p className="text-xl md:text-3xl font-semibold">
                {posts.length}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-base md:text-lg font-medium">
                Hate Speech Posts 🤬
              </h2>
              <p className="text-xl md:text-3xl font-semibold">
                {posts.filter((post) => post.isHateSpeech).length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <ul>
        {posts.map((post) => (
          <Card key={post._id} className="mb-5 py-4 pb-4 px-0">
            <CardContent className="py-2 flex flex-col gap-1">
              {post.isHateSpeech ? (
                <p className="text-sm md:text-base text-red-500">
                  ⚠️ This post contains hate speech
                </p>
              ) : (
                <p className="text-sm md:text-base text-green-500 font-semibold">
                  {" "}
                  ✅ Published
                </p>
              )}
              <h2 className="text-base md:text-lg font-semibold">
                {post.content}
              </h2>
            </CardContent>
            <CardFooter className="py-0">
              <p className="text-xs md:text-sm">
                Posted by {post.createdBy} on{" "}
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </CardFooter>
          </Card>
        ))}
      </ul>
    </main>
  );
}

export default Page;
