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
      addMessage({
        id: conversation._id,
        content: { text: messageText },
      })
    );

    setMessageText("");
  };

  if (!conversation) {
    return (
      <div className="w-[60vw] h-[calc(100vh-20px)] bg-[#151517] rounded-r-2xl flex items-center justify-center">
        <p className="text-white">Sélectionnez une conversation</p>
      </div>
    );
  }

  const sortedMessages = [...conversation.messages].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return (
    <div className="w-[60vw] rounded-r-2xl justify-between h-[calc(100vh-20px)] bg-[#151517] flex flex-col">
      <div className="border-b border-gray-700">
        <div className="m-2">
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
      </div>

      <div className="flex-1 flex-col overflow-y-auto p-4 gap-1 flex custom-scrollbar">
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

      <div className="border-t border-gray-700 h-38 flex flex-col justify-center">
        <div className="flex items-center">
          <div className="w-9/10 p-2">
            <Textarea
              className="resize-none h-30"
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
          </div>
          <div className="flex flex-col gap-2 w-24 mr-2">
            <Button
              className="cursor-pointer"
              title="Envoyer le message"
              onClick={handleSendMessage}
            >
              <i className="bi bi-send text-xl"></i>
            </Button>
            <Button className="cursor-pointer" title="Joindre un fichier">
              <i className="bi bi-paperclip text-xl"></i>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
