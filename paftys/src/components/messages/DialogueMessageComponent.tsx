import { Textarea } from "@/components/ui/textarea";
import ProfileComponent from "../shared/ProfileComponent";
import SingularMessageComponent from "./SingularMessageComponent";
import { Button } from "../ui/button";
export default function DialogueMessageComponent() {
  let messages = Array(30).fill("foobar");

  return (
    <>
      <div className="w-[60vw] rounded-r-2xl justify-between  h-[calc(100vh-20px)] bg-[#151517] flex flex-col">
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

        <div className="flex-1 flex-col-reverse overflow-y-auto p-4 gap-1 flex custom-scrollbar">
          {messages.map((msg, idx) => (
            <SingularMessageComponent
              key={idx}
              MessageContent={msg}
              IsUserSender={idx % 3 === 0}
            />
          ))}
        </div>

        <div className="border-t border-gray-700 h-38 flex flex-col justify-center">
          <div className="flex items-center">
            <div className="w-9/10 p-2">
              <Textarea
                className="resize-none h-30"
                placeholder="Entrez votre message ici..."
              />
            </div>
            <div className="flex flex-col gap-2 w-24 mr-2">
              <Button className="cursor-pointer" title="Envoyer le message">
                <i className="bi bi-send text-xl"></i>
              </Button>
              <Button className="cursor-pointer" title="Joindre un fichier">
                <i className="bi bi-paperclip text-xl"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
