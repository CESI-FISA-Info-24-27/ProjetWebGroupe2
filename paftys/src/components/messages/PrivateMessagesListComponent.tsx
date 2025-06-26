import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchConversations } from "@/reducers/conversationSlice";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageDisplayComponent from "./MessageDisplayComponent";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NewConversationModal from "./NewConversationModal";
import { useState } from "react";

export default function PrivateMessagesListComponent({
  onSelectConversation,
}: {
  onSelectConversation: (conv: any) => void;
}) {
  const dispatch = useAppDispatch();
  const { conversations, loading } = useAppSelector(
    (state) => state.conversation
  );
  const user = useAppSelector((state) => state.auth.user);
  const baseUrl = import.meta.env.VITE_DB_URI;
  const profilePictureUrl = `${baseUrl}/uploads/profiles/`;

  const [modalOpen, setModalOpen] = useState(false);
  const handleNewConversation = () => setModalOpen(true);

  useEffect(() => {
    dispatch(fetchConversations());
  }, []);

  const parseOtherUserData = (conv: any) => {
    const other = conv.participants.find(
      (p: any) => typeof p === "object" && p._id !== user?.id
    );
    return {
      userName: other?.userName || "Utilisateur inconnu",
      profilePicture: `${profilePictureUrl}${
        other?.profilePicture || "default.png"
      }`,
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
    <div className="flex flex-col h-full w-full md:rounded-l-2xl overflow-hidden">
      <div className="flex justify-end items-center p-2 border-b border-r border-sidebar-border text-wrap">
        <div className="flex flex-row items-center">
          <p className="pl-4"> Créer une conversation...</p>
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:text-purple-500 cursor-pointer"
            onClick={handleNewConversation}
            title="Nouvelle conversation"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1 border-r border-sidebar-border overflow-y-auto pb-14">
        <div className="flex flex-col gap-4 py-2 px-4 bg-sidebar text-sidebar-foreground">
          {loading && <p className="text-foreground">Chargement...</p>}
          {!loading && conversations.length === 0 && (
            <p className="text-muted-foreground text-center py-8">
              Vous n&apos;avez encore aucune conversation privée.
              <br />
              Cliquez sur <span className="font-bold">+</span> pour en démarrer
              une !
            </p>
          )}
          {!loading &&
            conversations.length > 0 &&
            conversations.map((conv) => {
              const otherUser = parseOtherUserData(conv);
              return (
                <div
                  key={conv._id}
                  className="cursor-pointer transition-transform duration-300 hover:translate-y-[-2px] hover:bg-muted rounded-lg"
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
      <NewConversationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        currentUserId={user?.id || ""}
      />
    </div>
  );
}
