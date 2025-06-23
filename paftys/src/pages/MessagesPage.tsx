import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import MessagesListComponent from "@/components/messages/MessagesListComponent";
import DialogueMessageComponent from "@/components/messages/DialogueMessageComponent";

export default function MessagesPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);

  const conversation = useAppSelector((state) =>
    state.conversation.conversations.find(
      (conv) => conv._id === selectedConversationId
    )
  );

  return (
    <div className="flex justify-start w-full items-center">
      <div className="mx-10 my-[10px] flex bg-[#151517] rounded-l-2xl rounded-r-2xl">
        <MessagesListComponent
          onSelectConversation={(conv) => setSelectedConversationId(conv._id)}
        />
        <div className="w-full">
          <DialogueMessageComponent conversation={conversation} />
        </div>
      </div>
    </div>
  );
}
