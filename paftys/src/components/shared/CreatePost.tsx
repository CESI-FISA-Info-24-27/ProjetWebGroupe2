import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import ProfileComponent from "../shared/ProfileComponent";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { createPost } from "@/reducers/postSlice";

interface CreatePostProps {
  repliesTo?: string; // ID du post auquel on répond
}

export default function CreatePost({ repliesTo }: CreatePostProps) {
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [tags, setTags] = useState("");

  if (!user) return null; // sécurité si non connecté
const dispatch = useAppDispatch();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!text.trim()) return;

  try {
    const newPost = await dispatch(
      createPost({
        content: { text, images: image ? [image] : [] },
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        repliesTo,
      })
    ).unwrap();  // unwrap pour récupérer directement la valeur ou gérer erreur


    setText("");
    setImage(null);
    setTags("");
  } catch (err) {
    console.error("Erreur lors de la création du post :", err);
  }
};


  return (
    <div className="border p-4 rounded-2xl shadow bg-white dark:bg-zinc-900 w-full">
      <div className="flex items-start gap-4">
        <ProfileComponent
          image={user.profilePicture}
          userName={user.userName}
          biography={user.biography}
          condensed={true}
        />
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-3">
          <Textarea
            placeholder={repliesTo ? "Votre réponse..." : "Quoi de neuf ?"}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="resize-none"
            rows={3}
          />

          {image && (
            <img
              src={image}
              alt="Aperçu"
              className="max-w-xs max-h-48 rounded-xl object-cover"
            />
          )}

          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
            <Input
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
            />

            <Input
              placeholder="Tags (séparés par virgules)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full sm:w-1/2"
            />

            <Button type="submit" className="w-full sm:w-auto">
              {repliesTo ? "Répondre" : "Publier"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}