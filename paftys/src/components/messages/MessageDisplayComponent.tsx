interface Props {
  username: string;
  profilePic: string;
  preview: string;
}

export default function MessageDisplayComponent({
  username,
  profilePic,
  preview,
}: Props) {
  return (
    <div className="flex gap-4 w-[300px] bg-[#1f1f23] p-4 rounded-2xl">
      <img src={profilePic} className="h-15 w-15 rounded-full" />
      <div className="flex flex-col overflow-hidden">
        <p className="text-xl truncate">{username}</p>
        <p className="text-gray-500 truncate">{preview}</p>
      </div>
    </div>
  );
}
