"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IconMessageDots, IconTriangleInfoFill } from "@irsyadadl/paranoid";
import { Badge } from "@/components/ui/badge";

interface Post {
  content: string;
  imageUrl: string;
  createdBy: string;
  createdAt: string;
  userIp: string;
  isHateSpeech: boolean;
  comments: {
    _id: string;
    content: string;
    createdBy: string;
    createdAt: string;
  }[];
}

interface PageProps {
  params: {
    slug: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const { slug } = params;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null as Error | null);
  const [isFocused, setIsFocused] = useState(false);
  const [comment, setComment] = useState("");
  const guestId = localStorage.getItem("guestId");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errorComment, setErrorComment] = useState<string>("");
  const [probability, setProbability] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://safety.akutegar.com/api/posts/${slug}`);
        const data = await response.json();
        setPost(data);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("An unknown error occurred"));
        }
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  const handleCommentSubmit = async () => {
    setIsSubmitting(true);
    if (!comment || !guestId) {
      return;
    }

    try {
      const response = await fetch(
        `https://safety.akutegar.com/api/posts/${slug}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: comment, guestId }),
        }
      );

      if (response.ok) {
        const newComment = await response.json();

        // get probaility in response data

        if (newComment.message === "Error: Hate Speech Detected") {
          setProbability(newComment.probability);
          setErrorComment("Hate Speech Detected");
        } else {
          setPost((prevPost) => {
            if (!prevPost) return prevPost;
            return {
              ...prevPost,
              // get last index newcomment.comments
              comments: [
                ...prevPost.comments,
                newComment.comments[newComment.comments.length - 1],
              ],
            };
          });
        }

        setComment(""); // Clear the comment textarea
        setIsFocused(false); // Hide the buttons
      } else {
        console.error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading post.</p>;

  return (
    <main className="xl:col-span-2 sm-col-span-1 md:col-span-3 border p-4">
      {post && (
        <>
          <h2 className="text-lg md:text-xl font-bold mb-2">{post.content}</h2>
          <img src={post.imageUrl} alt="Post image" className="mb-4" />
          <p className="text-sm md:text-base">
            <strong>Created By:</strong> {post.createdBy}
          </p>
          <p className="text-sm md:text-base">
            <strong>Created At:</strong>{" "}
            {new Date(post.createdAt).toLocaleString()}
          </p>
          <div>
            {errorComment && (
              <Alert variant="destructive">
                <IconTriangleInfoFill className="h-4 w-4" />
                <AlertTitle>
                  Upsss please comments with good words 😡
                </AlertTitle>
                <AlertDescription>
                  This comments contains hate speech or bully content. Please
                  remove the hate speech or bully content and try again.
                  <br />
                </AlertDescription>
              </Alert>
            )}

            <div className="mt-4">
              <Badge variant={"secondary"}>
                <IconMessageDots />
                <span className="ml-2 text-xs md:text-sm">
                  {post.comments.length} Comments
                </span>
              </Badge>
            </div>

            <div className="relative mt-5">
              <Textarea
                placeholder=" write a comment..."
                className="rounded-xl"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onFocus={() => setIsFocused(true)}
              />
              {(isFocused || isSubmitting) && (
                <div className="absolute bottom-2 right-2 flex flex-row gap-4">
                  <Button
                    size={"sm"}
                    variant={"secondary"}
                    className="rounded-lg"
                    onMouseDown={() => {
                      setIsFocused(false);
                      setComment("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="rounded-lg"
                    size={"sm"}
                    type="submit"
                    onMouseDown={handleCommentSubmit}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              )}
            </div>

            <div>
              {post.comments.map((comment) => (
                <div
                  key={comment._id}
                  className="border-t mt-2 pt-2 flex flex-row gap-2"
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${comment.createdBy}`}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex flex-row justify-between w-full">
                      <p className="font-semibold text-sm md:text-base">
                        {comment.createdBy}
                      </p>
                      <p className="text-muted-foreground text-xs md:text-sm">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-muted-foreground text-xs md:text-sm">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Page;
