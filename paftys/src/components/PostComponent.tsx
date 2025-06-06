import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type Post from "@/models/Post";
import { useState } from "react";
import ProfileComponent from "./ProfileComponent";

export default function PostComponent(postData: Post) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);
  const shouldTruncate = postData.content.text.length > 240;

  return (
    <Card className="w-fit gap-2">
      <CardHeader className="flex flex-row justify-between px-4">
        <div className="flex flex-row items-center gap-2 cursor-pointer">
          <ProfileComponent
            image={postData.userData.profilePicture}
            userName={postData.userData.userName}
            biography={postData.userData.biography}
            condensed={true}
          />
        </div>
        <span className="text-sm text-gray-500">
          Posté le {postData.createdAt.toLocaleDateString()} à{" "}
          {postData.createdAt.toLocaleTimeString([], {
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
        <div className="flex flex-row items-center gap-6">
          <div className="flex flex-row items-center mt-4 gap-1">
            <Button
              variant="ghost"
              className="p-0 h-fit cursor-pointer rounded-full hover:bg-transparent dark:hover:bg-transparent transition-transform duration-300 hover:translate-y-[-2px]"
            >
              <i className="bi bi-heart text-purple-700 text-xl leading-none align-middle"></i>
            </Button>
            <div className="text-sm">{postData.likes.length}</div>
          </div>
          <div className="flex flex-row items-center mt-4 gap-1">
            <Button
              variant="ghost"
              className="p-0 h-fit cursor-pointer rounded-full hover:bg-transparent dark:hover:bg-transparent transition-transform duration-300 hover:translate-y-[-2px]"
            >
              <i className="bi bi-chat-left text-xl leading-none align-middle"></i>
            </Button>
            <div className="text-sm">{postData.replies.length}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
