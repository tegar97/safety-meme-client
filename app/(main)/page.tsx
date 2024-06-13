"use client";
import { ThemeSelector } from "@/components/theme-selector";
import PostForm from "@/components/post-form";
import { useEffect, useState } from "react";
import PostList from "@/components/post-list";
import axios from "axios";
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

export default function Home() {
  const [guestId, setGuestId] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Check if guestId already exists in localStorage
    let storedGuestId = localStorage.getItem("guestId");
    if (!storedGuestId) {
      // Generate new guestId
      storedGuestId = `Guest-${Math.floor(Math.random() * 10000)}`;
      // Save guestId to localStorage
      localStorage.setItem("guestId", storedGuestId);
    }
    setGuestId(storedGuestId);

    // Fetch posts from server
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    try {
      const response = await axios.get("https://safety.akutegar.com/api/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handlePostCreated = () => {
    fetchPosts();
  };
  return (
    <main className=" xl:col-span-2 sm-col-span-1 md:col-span-3 border ">
      <div className="py-4 px-4">
        <span>
          Yours user id: <span className=" font-bold ">{guestId} </span>
        </span>
      </div>
      <PostForm guestId={guestId} onPostCreated={handlePostCreated} />
      <PostList posts={posts} />
    </main>
  );
}
