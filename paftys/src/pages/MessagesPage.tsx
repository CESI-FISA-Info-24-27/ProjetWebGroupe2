import { useState } from "react";
import MessagesListComponent from "@/components/messages/MessagesListComponent";
import DialogueMessageComponent from "@/components/messages/DialogueMessageComponent";

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<any>(null);

  return (
    <div className="flex justify-start w-full items-center">
      <div className="mx-10 my-[10px] flex bg-[#151517] rounded-l-2xl rounded-r-2xl">
        <MessagesListComponent onSelectConversation={setSelectedConversation} />
        <div className="w-full">
          <DialogueMessageComponent conversation={selectedConversation} />
        </div>
      </div>
    </div>
  );
}
