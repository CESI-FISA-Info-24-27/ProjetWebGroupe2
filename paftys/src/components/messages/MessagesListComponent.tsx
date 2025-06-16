import { ScrollArea } from "@/components/ui/scroll-area";
import MessageDisplayComponent from "./MessageDisplayComponent";
export default function MessagesList(messages: any) {
  messages = Array(30).fill("");
  return (
    <>
      {/* A changer car le h-[calc(100vh-5vh)] c vrmt déguelasse mais le scrollbar de shadcn
      déconne un peu avec le max height */}
      <ScrollArea className="border-r rounded-l-2xl border-gray-700 h-[calc(100vh-20px)]">
        <div className="flex flex-col bg-[#151517] gap-4 py-2 px-4">
          {messages.map(() => (
            <div className="cursor-pointer transition-transform duration-300 hover:translate-y-[-2px]">
              <MessageDisplayComponent></MessageDisplayComponent>
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  );
}
