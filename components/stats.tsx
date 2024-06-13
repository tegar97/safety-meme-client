"use client"
import React, { useEffect, useState } from 'react';

function Stats() {
  const [totalPosts, setTotalPosts] = useState(0);
  const [hateSpeechPosts, setHateSpeechPosts] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://127.0.0.1:3001/api/posts/statics');
        const data = await response.json();
        setTotalPosts(data.totalPosts);
        setHateSpeechPosts(data.hateSpeechPosts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="pl-4 xl:flex flex-col gap-4 sm:hidden">
      <h2 className="text-lg font-medium">Statistics</h2>
      <ul>
        <li className='text-sm'>🥳 Total Memes: {totalPosts}</li>
        <li className='text-sm'>🚫 Non-Safe Memes Blocked: {hateSpeechPosts}</li>
      </ul>
    </div>
  );
}

export default Stats;
