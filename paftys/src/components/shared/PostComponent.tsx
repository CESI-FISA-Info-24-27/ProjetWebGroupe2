import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type Post from "@/models/Post";
import { useState } from "react";
import ProfileComponent from "./ProfileComponent";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleLikePost, fetchPostLikers, createPost  } from "@/reducers/postSlice";
import {
  HoverCardTrigger,
  HoverCardContent,
  HoverCard,
} from "@/components/ui/hover-card";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect } from "react";

export default function PostComponent(postData: Post) {
  const [expanded, setExpanded] = useState(false);
  
  const dispatch = useAppDispatch();
  const EMPTY_ARRAY: any[] = [];
  const posts = useAppSelector(state => state.post.posts);
  const replies = posts.filter(p => p.repliesTo === postData._id);
  const [replyContent, setReplyContent] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);

  useEffect(() => {
    dispatch(
      fetchPostLikers({ postId: postData._id, userIds: postData.likes })
    );
  }, [postData.likes]);

  const postLikers = useAppSelector(
    (state) => state.post.postLikersByPostId[postData._id] || EMPTY_ARRAY
  );

  const userId = useAppSelector((state) => state.auth.user?.id) || "";

  const hasLiked = postData.likes.includes(userId);

  if (!postData.content || !postData.content.text) return null;
  const createdAt =
    postData.createdAt instanceof Date
      ? postData.createdAt
      : new Date(postData.createdAt);

  const toggleExpanded = () => setExpanded((prev) => !prev);
  const shouldTruncate = postData.content.text.length > 240;

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(toggleLikePost({ postId: postData._id }));
  };
  const handleReplySubmit = () => {
    if (!replyContent.trim()) return;
    dispatch(createPost({
      content: { text: replyContent },
      repliesTo: postData._id,
    }));
    setReplyContent("");
    setShowReplyForm(false);
  };
  return (
    <Card className="w-fit gap-2">
      <CardHeader className="flex flex-row justify-between px-4">
        <div className="flex flex-row items-center gap-2">
          <ProfileComponent
            image={postData.userData.profilePicture}
            userName={postData.userData.userName}
            biography={postData.userData.biography}
            condensed={true}
          />
        </div>
        <span className="text-sm text-gray-500">
          Posté le {createdAt.toLocaleDateString()} à{" "}
          {createdAt.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </CardHeader>
      <CardContent className="w-[600px] px-4">
        <p>
          {shouldTruncate && !expanded
            ? postData.content.text.slice(0, 240) + "..."
            : postData.content.text}{" "}
          {shouldTruncate && (
            <a
              onClick={toggleExpanded}
              className="underline text-blue-500 hover:text-blue-700 cursor-pointer"
            >
              {expanded ? "Voir moins" : "Lire la suite"}
            </a>
          )}
        </p>
        <div className="flex items-center gap-6">
          <div className="flex flex-row items-center mt-4 gap-1">
            <HoverCard>
              <HoverCardTrigger>
                {" "}
                <Button
                  type="button"
                  onClick={handleLike}
                  variant="ghost"
                  className="p-0 h-fit cursor-pointer rounded-full hover:bg-transparent dark:hover:bg-transparent transition-transform duration-300 hover:translate-y-[-2px]"
                >
                  {hasLiked ? (
                    <i className="bi bi-heart-fill text-purple-700 text-xl leading-none align-middle"></i>
                  ) : (
                    <i className="bi bi-heart text-purple-700 text-xl leading-none align-middle"></i>
                  )}
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="flex flex-col gap-4">
                {postLikers.length === 0 ? (
                  <>
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-center">
                        Personne n'a encore liké ce post.
                      </p>
                      <div className="bi bi-emoji-frown text-5xl"></div>
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <p className="self-center">
                      {postData.likes.length} Likes{" "}
                    </p>
                    <ScrollArea>
                      <div className="max-h-60">
                        <div className="flex flex-col gap-4 w-full">
                          {postLikers.map((user, index) => (
                          <ProfileComponent
                            key={user._id || index}
                            image={user.profilePicture}
                            userName={user.userName}
                            biography={user.biography}
                            condensed={false}
                          />
                        ))}
                        </div>
                      </div>
                    </ScrollArea>
                  </>
                )}
              </HoverCardContent>
            </HoverCard>

            <div className="text-sm">{postData.likes.length}</div>
          </div>
          <div className="flex flex-col items-start mt-4 gap-2 w-full">
  <div className="flex flex-row items-center gap-1">
    <Button
      type="button"
      variant="ghost"
      onClick={() => setShowReplyForm(prev => !prev)}
      className="p-0 h-fit cursor-pointer rounded-full hover:bg-transparent dark:hover:bg-transparent transition-transform duration-300 hover:translate-y-[-2px]"
    >
      <i className="bi bi-chat-left text-xl leading-none align-middle"></i>
    </Button>
    <div className="text-sm">{postData.replies.length}</div>
  </div>

  {showReplyForm && (
    <div className="w-full bg-muted rounded-xl border p-4 shadow-sm">
      <textarea
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        placeholder="Écris ta réponse ici..."
        className="w-full resize-none rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition duration-150"
        rows={4}
      />
      <div className="flex justify-end mt-2">
        <Button type="button" onClick={handleReplySubmit}>
          Répondre
        </Button>
      </div>
    </div>
  )}
</div>


        </div>
      </CardContent>
      {replies.length > 0 && (
        <div className="ml-6 mt-4 flex flex-col gap-4 border-l border-gray-200 pl-4">
            {replies.map((reply) => (
            <PostComponent key={reply._id} {...reply} />
          ))}
        </div>
      )}

    </Card>
  );
}
