import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchConversations } from "@/reducers/conversationSlice";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageDisplayComponent from "./MessageDisplayComponent";
import { Plus } from "lucide-react"; // icône sympa
import { Button } from "@/components/ui/button";

export default function MessagesListComponent() {
  const dispatch = useAppDispatch();
  const { conversations, loading } = useAppSelector(
    (state) => state.conversation
  );

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  const handleNewConversation = () => {
    console.log("Nouvelle conversation");
    // Tu peux ouvrir une modale ou naviguer vers une autre page ici
  };

  const userId = useAppSelector((state) => state.auth.user?.id);

  const convUsernames = (conv) => {
    return conv.participants
      .filter((p) => typeof p === "object" && p._id !== userId)
      .map((p) => p.userName)
      .join(", ");
  };

  return (
    <ScrollArea className="border-r rounded-l-2xl border-gray-700 h-[calc(100vh-20px)]">
      <div className="flex flex-col bg-[#151517] gap-4 py-2 px-4">
        {/* Bouton + */}
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-purple-500"
            onClick={handleNewConversation}
            title="Nouvelle conversation"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        {/* Liste des conversations */}
        {loading && <p className="text-white">Chargement...</p>}
        {!loading &&
          conversations.map((conv) => {
            const lastMessage = "Aucun message";
            return (
              <div
                key={conv._id}
                className="cursor-pointer transition-transform duration-300 hover:translate-y-[-2px]"
                onClick={() => console.log("Select conversation:", conv._id)}
              >
                <MessageDisplayComponent
                  username={convUsernames(conv)} // temporaire
                  profilePic="https://randomuser.me/api/portraits/men/21.jpg"
                  preview={lastMessage}
                />
              </div>
            );
          })}
      </div>
    </ScrollArea>
  );
}
