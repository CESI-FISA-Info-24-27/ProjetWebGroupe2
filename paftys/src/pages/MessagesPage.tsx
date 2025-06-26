import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import PrivateMessagesListComponent from "@/components/messages/PrivateMessagesListComponent";
import DialogueMessageComponent from "@/components/messages/DialogueMessageComponent";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MessagesPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);

  const conversation = useAppSelector((state) =>
    state.conversation.conversations.find(
      (conv) => conv._id === selectedConversationId
    )
  );

  const handleBack = () => setSelectedConversationId(null);

  return (
    <div className="flex w-full h-screen bg-background text-foreground">
      <div className="flex w-full h-full flex-col md:flex-row md:mx-10 md:my-[10px] bg-sidebar text-sidebar-foreground md:rounded-2xl overflow-hidden">
        {/* Liste des conversations */}
        <div
          className={`w-full md:w-1/3 h-full ${
            selectedConversationId ? "hidden md:block" : "block"
          }`}
        >
          <PrivateMessagesListComponent
            onSelectConversation={(conv) => setSelectedConversationId(conv._id)}
          />
        </div>

        {/* Zone de messages */}
        <div
          className={`w-full md:w-2/3 h-full flex flex-col ${
            !selectedConversationId ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Bouton retour mobile */}
          <div className="md:hidden p-2">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-hidden">
            <DialogueMessageComponent conversation={conversation} />
          </div>
        </div>
      </div>
    </div>
  );
}
