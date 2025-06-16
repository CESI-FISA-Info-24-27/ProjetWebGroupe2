import { Textarea } from "@/components/ui/textarea";
import ProfileComponent from "../shared/ProfileComponent";
import SingularMessageComponent from "./SingularMessageComponent";

export default function DialogueMessageComponent() {
  let messages = Array(30).fill("foobar");

  return (
    <>
      <div className="w-[1000px] rounded-r-2xl justify-between  h-[calc(100vh-20px)] bg-[#151517] flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-700">
          <div className="m-2">
            <ProfileComponent
              image={"https://randomuser.me/api/portraits/men/21.jpg"}
              userName={"John doe"}
              biography={"J'aime vraiment bcp les pâtes"}
              condensed={false}
            />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 gap-1 flex flex-col">
          {messages.map((msg, idx) => (
            <SingularMessageComponent
              key={idx}
              MessageContent={msg}
              IsUserSender={idx % 3 === 0}
            />
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-gray-700">
          <div className="w-9/10 p-2">
            <Textarea className="resize-none h-10 m-0" />
          </div>
        </div>
      </div>
    </>
  );
}
