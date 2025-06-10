import MessagesList from "@/components/MessagesListComponent";
import SubNavBar from "@/components/SubNavBar";
import DialogueMessageComponent from "@/components/DialogueMessageComponent";
export default function MessagesPage() {
  return (
    <>
      <div className="flex justify-between w-full items-center">
        <div className="mx-25 flex bg-[#151517] rounded-l-2xl rounded-r-2xl ">
          <MessagesList></MessagesList>
          <DialogueMessageComponent></DialogueMessageComponent>
        </div>
        <SubNavBar />
      </div>
    </>
  );
}
