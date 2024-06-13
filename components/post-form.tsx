"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IconTriangleInfoFill } from "@irsyadadl/paranoid";
import { Input } from "./ui/input";
import Image from "next/image";
import { AxiosError } from "axios";

interface PostFormProps {
  guestId: string;
  onPostCreated: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ guestId, onPostCreated }) => {
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [probability, setProbability] = useState<number | null>(null);
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }
    formData.append("guestId", guestId);

    try {
      const response = await axios.post(
        "https://safety.akutegar.com/api/posts",
        {
          content,
          guestId,
          image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.message === "Error: Hate Speech Detected") {
        setProbability(response.data.probability);
        setError("Hate Speech Detected");
        setSuccess("");
      } else {
        setError("");
        setSuccess("Meme posted successfully!");
        setContent("");
        setImage(null);
        setImagePreview(null);

        onPostCreated();
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    }

    setLoading(false);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full py-4 px-4 "
    >
      {error && (
        <>
          <Alert variant="destructive">
            <IconTriangleInfoFill className="h-4 w-4" />
            <AlertTitle>Please don{`'`}t do that </AlertTitle>
            <AlertDescription>
              This meme contains hate speech or bully content. Please remove the
              hate speech or bully content and try again.
            </AlertDescription>
          </Alert>
        </>
      )}
      {imagePreview && (
        <Image
          src={imagePreview}
          width={3000}
          height={380}
          alt="Preview"
          className="mb-4 h-96  object-fit h-auto rounded"
        />
      )}
      <Textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Enter meme text"
        className="border p-2 rounded"
        required
      />
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="border p-2 rounded"
      />
      <Button type="submit">{loading ? "Loading..." : "Post"}</Button>

      {success && <p className="text-green-500">{success}</p>}
    </form>
  );
};

export default PostForm;
