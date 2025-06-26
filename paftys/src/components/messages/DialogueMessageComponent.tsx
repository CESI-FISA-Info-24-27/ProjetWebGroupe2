import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addMessage } from "@/reducers/conversationSlice";
import ProfileComponent from "../shared/ProfileComponent";
import SingularMessageComponent from "./SingularMessageComponent";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export default function DialogueMessageComponent({
  conversation,
}: {
  conversation: any;
}) {
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector((state) => state.auth.user?.id);
  const [messageText, setMessageText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages?.length]);

  const other = useMemo(() => {
    return conversation?.participants?.find(
      (p: any) => typeof p === "object" && p._id !== currentUserId
    );
  }, [conversation?.participants, currentUserId]);

  const handleSendMessage = () => {
    if (!messageText.trim() || !conversation?._id) return;

    dispatch(
      addMessage({ id: conversation._id, content: { text: messageText } })
    );
    setMessageText("");
  };

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full bg-sidebar text-sidebar-foreground">
        <p>Sélectionnez une conversation</p>
      </div>
    );
  }

  const sortedMessages = [...conversation.messages].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground transition-colors">
      {/* Header */}
      <div className="border-b border-sidebar-border p-2">
        <ProfileComponent
          image={
            other?.profilePicture ||
            "https://randomuser.me/api/portraits/men/21.jpg"
          }
          userName={other?.userName || "Utilisateur inconnu"}
          biography={other?.biography || "Pas de bio"}
          condensed={false}
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 gap-1 flex flex-col custom-scrollbar">
        {sortedMessages.map((msg, idx) => (
          <SingularMessageComponent
            key={msg._id || idx}
            MessageContent={msg.content?.text || "[Message vide]"}
            IsUserSender={
              msg.sender === currentUserId ||
              (typeof msg.sender === "object" &&
                msg.sender._id === currentUserId)
            }
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Zone d'envoi */}
      <div className="border-t border-sidebar-border p-2 pb-16 md:pb-4 ">
        <div className="flex gap-2">
          <Textarea
            className="flex-1 resize-none"
            placeholder="Entrez votre message ici..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <div className="flex flex-col gap-2 justify-end">
            <Button onClick={handleSendMessage} title="Envoyer le message">
              <i className="bi bi-send text-xl" />
            </Button>
            <Button title="Joindre un fichier">
              <i className="bi bi-paperclip text-xl" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
