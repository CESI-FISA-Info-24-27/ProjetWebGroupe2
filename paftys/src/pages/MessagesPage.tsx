import MessagesList from "@/components/messages/MessagesListComponent";
import DialogueMessageComponent from "@/components/messages/DialogueMessageComponent";
export default function MessagesPage() {
  return (
    <>
      <div className="flex justify-start w-full items-center">
        <div className="mx-10 my-[10px] flex bg-[#151517] rounded-l-2xl rounded-r-2xl ">
          <MessagesList></MessagesList>
          <div className="w-max">
            <DialogueMessageComponent></DialogueMessageComponent>
          </div>
        </div>
      </div>
    </>
  );
}
