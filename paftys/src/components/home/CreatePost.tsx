import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createPost } from "@/reducers/postSlice";
import { Loader2 } from "lucide-react";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.post);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    try {
        await dispatch(createPost({ content: { text: content } })).unwrap();

      setContent("");
    } catch (err) {
      console.error("Erreur lors de la création du post :", err);
    }
  };

  return (
    <div className="bg-card text-card-foreground flex flex-col rounded-xl border py-6 shadow-sm w-[50%] gap-2">
        <div className="w-[80%] ml-15">
            <textarea
                name="CreatePostTextArea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Qu'avez-vous envie de partager ?"
                className="w-full min-h-[100px] resize-none p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
        </div>

      {error && (
        <p className="text-sm text-red-500 -mt-2">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading || !content.trim()}
        className="self-end bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin w-4 h-4 mr-2" />
            Publication...
          </>
        ) : (
          "Publier"
        )}
      </button>
    </div>
  );
}
