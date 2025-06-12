import { Textarea } from "@/components/ui/textarea";
import ProfileComponent from "./ProfileComponent";
import SingularMessageComponent from "./SingularMessageComponent";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function DialogueMessageComponent() {
  let messages = Array(30).fill("foobar");

  return (
    <>
      <div className="h-[600px] w-[600px] rounded-r-2xl bg-[#151517] flex flex-col">
        <div className="border-b border-gray-700">
          <div className="m-2">
            <ProfileComponent
              image={"https://randomuser.me/api/portraits/men/21.jpg"}
              userName={"John doe"}
              biography={"J'aime vraiment les pâtes"}
              condensed={false}
            />
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="flex flex-col p-4 gap-1">
              {messages.map((msg, idx) => (
                <SingularMessageComponent
                  key={idx}
                  MessageContent={msg}
                  IsUserSender={idx % 2 === 0}
                />
              ))}
            </div>
          </ScrollArea>
        </div>

        <Textarea className="resize-none h-10" />
      </div>
    </>
  );
}
