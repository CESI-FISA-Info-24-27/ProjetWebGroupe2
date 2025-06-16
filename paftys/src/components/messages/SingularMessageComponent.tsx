interface MessageInfo {
  MessageContent: string;
  IsUserSender: boolean;
}

export default function SingularMessageComponent({
  MessageContent,
  IsUserSender,
}: MessageInfo) {
  return (
    <div
      className={`flex w-full mb-2 ${
        IsUserSender ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-2xl text-white break-words ${
          IsUserSender
            ? "bg-purple-700 rounded-br-none"
            : "bg-gray-700 rounded-bl-none"
        }`}
      >
        {MessageContent}
      </div>
    </div>
  );
}
