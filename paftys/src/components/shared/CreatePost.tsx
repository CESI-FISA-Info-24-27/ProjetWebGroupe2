import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import ProfileComponent from "../shared/ProfileComponent";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { createPost } from "@/reducers/postSlice";

interface CreatePostProps {
  repliesTo?: string;
  onPostCreated?: () => void;
}

export default function CreatePost({
  repliesTo,
  onPostCreated,
}: CreatePostProps) {
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [tags, setTags] = useState("");
  const [error, setError] = useState<string | null>(null);

  const CHARACTER_LIMIT = 500;

  if (!user) return null;
  const dispatch = useAppDispatch();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > CHARACTER_LIMIT) {
      setError("Limite de 500 caractères atteinte.");
      setText(value.slice(0, CHARACTER_LIMIT));
    } else {
      setError(null);
      setText(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || text.length > CHARACTER_LIMIT) return;

    try {
      await dispatch(
        createPost({
          content: { text, images: image ? [image] : [] },
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          repliesTo,
        })
      ).unwrap();
      setText("");
      setImage(null);
      setTags("");
      setError(null);
      onPostCreated?.();
    } catch (err) {
      console.error("Erreur lors de la création du post :", err);
    }
  };

  return (
    <div className="border p-4 rounded-2xl shadow mt-4 bg-white w-[95%] sm:w-[90%] lg:w-[70%] dark:bg-zinc-900 w-full">
      <div className="flex items-start gap-4">
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-3">
          <Textarea
            placeholder={repliesTo ? "Votre réponse..." : "Quoi de neuf ?"}
            value={text}
            onChange={handleTextChange}
            className="resize-none break-all"
            rows={3}
          />
          <div className="flex justify-between items-center">
            <span
              className={`text-xs ${
                text.length >= CHARACTER_LIMIT
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
            >
              {text.length}/{CHARACTER_LIMIT}
            </span>
            {error && <span className="text-xs text-red-500">{error}</span>}
          </div>
          {image && (
            <img
              src={image}
              alt="Aperçu"
              className="max-w-xs max-h-48 rounded-xl object-cover"
            />
          )}
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
            {/* <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onloadend = () => setImage(reader.result as string);
                reader.readAsDataURL(file);
              }}
              className="w-full sm:w-auto"
            /> */}
            <Button
              type="submit"
              className="w-full cursor-pointer sm:w-auto"
              disabled={text.length === 0 || text.length > CHARACTER_LIMIT}
            >
              {repliesTo ? "Répondre" : "Publier"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
