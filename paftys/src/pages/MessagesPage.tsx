import MessagesList from "@/components/messages/MessagesListComponent";
import RightSideBar from "@/components/home/RightSideBarComponent";
import DialogueMessageComponent from "@/components/messages/DialogueMessageComponent";
export default function MessagesPage() {
  return (
    <>
      <div className="flex justify-between w-full items-center">
        <div className="mx-25 flex bg-[#151517] rounded-l-2xl rounded-r-2xl ">
          <MessagesList></MessagesList>
          <DialogueMessageComponent></DialogueMessageComponent>
        </div>
        <RightSideBar />
      </div>
    </>
  );
}
