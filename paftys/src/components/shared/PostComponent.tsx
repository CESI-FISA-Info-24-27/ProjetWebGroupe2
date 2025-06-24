import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type Post from "@/models/Post";
import { useState } from "react";
import ProfileComponent from "./ProfileComponent";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleLikePost } from "@/reducers/postSlice";
import {
  HoverCardTrigger,
  HoverCardContent,
  HoverCard,
} from "@/components/ui/hover-card";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect } from "react";
import { fetchPostLikers } from "@/reducers/postSlice";
import { Link } from "react-router-dom";
export default function PostComponent(postData: Post) {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchPostLikers({ postId: postData._id, userIds: postData.likes })
    );
  }, [postData.likes]);

  const postLikers = useAppSelector(
    (state) => state.post.postLikersByPostId[postData._id] || []
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

  function renderTextWithHashtags(text: string) {
    const regex = /#(\w+)/g;
    const parts = [];
    let lastIndex = 0;

    let match;
    while ((match = regex.exec(text)) !== null) {
      const [fullMatch, tag] = match;
      const startIndex = match.index;

      if (startIndex > lastIndex) {
        parts.push(text.slice(lastIndex, startIndex));
      }

      parts.push(
        <a
          key={startIndex}
          href={`/tags/${tag}`}
          className="text-purple-700 cursor-pointer hover:underline"
        >
          {fullMatch}
        </a>
      );

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  }

  return (
    <Card className="w-full gap-2">
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
      <CardContent className="px-4">
        <p>
          {renderTextWithHashtags(
            shouldTruncate && !expanded
              ? postData.content.text.slice(0, 240) + "..."
              : postData.content.text
          )}
          {shouldTruncate && (
            <>
              {" "}
              <a
                onClick={toggleExpanded}
                className="underline text-blue-500 hover:text-blue-700 cursor-pointer"
              >
                {expanded ? "Voir moins" : "Lire la suite"}
              </a>
            </>
          )}
        </p>

        <div className="flex flex-row items-center gap-6">
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
                          {postLikers.map((user) => (
                            <ProfileComponent
                              key={user._id}
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
          <div className="flex flex-row items-center mt-4 gap-1">
            <Link
              to={`/post/${postData._id}`}
              className="p-0 h-fit cursor-pointer rounded-full hover:bg-transparent dark:hover:bg-transparent transition-transform duration-300 hover:translate-y-[-2px]"
            >
              <i className="bi bi-chat-left text-xl leading-none align-middle"></i>
            </Link>
            <div className="text-sm">{postData.replies.length}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
