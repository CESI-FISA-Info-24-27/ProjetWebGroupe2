import { ScrollArea } from "@/components/ui/scroll-area";
import MessageDisplayComponent from "./MessageDisplayComponent";
import { useAppSelector } from "@/redux/hooks";
export default function MessagesList(messages: any) {
  messages = Array(30).fill("");

  const user = useAppSelector((state) => state.auth.user);
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5555";
  const profilePictureUrl = `${baseUrl}/uploads/profiles/${user?.profilePicture}`;
  return (
    <>
      <ScrollArea className="h-[600px] border-r border-gray-700 p-4">
        <div className="flex flex-col bg-[#151517] gap-4">
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
