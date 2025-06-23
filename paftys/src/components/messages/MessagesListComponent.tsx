import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchConversations } from "@/reducers/conversationSlice";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageDisplayComponent from "./MessageDisplayComponent";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function MessagesListComponent({
  onSelectConversation,
}: {
  onSelectConversation: (conv: any) => void;
}) {
  const dispatch = useAppDispatch();
  const { conversations, loading } = useAppSelector(
    (state) => state.conversation
  );
  const userId = useAppSelector((state) => state.auth.user?.id);

  useEffect(() => {
    dispatch(fetchConversations());
  }, []);

  const handleNewConversation = () => {
    console.log("Nouvelle conversation");
  };

  const parseOtherUserData = (conv: any) => {
    const other = conv.participants.find(
      (p: any) => typeof p === "object" && p._id !== userId
    );
    return {
      userName: other?.userName || "Utilisateur inconnu",
      profilePicture:
        other?.profilePicture ||
        "https://randomuser.me/api/portraits/men/21.jpg",
    };
  };

  const getLastMessage = (conv: any) => {
    if (!conv.messages || conv.messages.length === 0) return "Aucun message";
    const content = conv.messages[conv.messages.length - 1]?.content;
    return typeof content === "object" && content.text
      ? content.text
      : "Aucun message";
  };

  return (
    <ScrollArea className="border-r rounded-l-2xl border-gray-700 h-[calc(100vh-20px)]">
      <div className="flex flex-col bg-[#151517] gap-4 py-2 px-4">
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-purple-500 cursor-pointer"
            onClick={handleNewConversation}
            title="Nouvelle conversation"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        {loading && <p className="text-white">Chargement...</p>}
        {!loading &&
          conversations.map((conv) => {
            const otherUser = parseOtherUserData(conv);
            return (
              <div
                key={conv._id}
                className="cursor-pointer transition-transform duration-300 hover:translate-y-[-2px]"
                onClick={() => onSelectConversation(conv)}
              >
                <MessageDisplayComponent
                  username={otherUser.userName}
                  profilePic={otherUser.profilePicture}
                  preview={getLastMessage(conv)}
                />
              </div>
            );
          })}
      </div>
    </ScrollArea>
  );
}
