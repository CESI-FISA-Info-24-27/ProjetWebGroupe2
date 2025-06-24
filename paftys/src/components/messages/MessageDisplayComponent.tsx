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
    <div className="flex gap-4 w-[300px] bg-sidebar text-sidebar-foreground p-4 rounded-2xl border shadow-sm transition-colors">
      <img src={profilePic} className="h-15 w-15 rounded-full object-cover" />
      <div className="flex flex-col overflow-hidden">
        <p className="text-xl truncate">{username}</p>
        <p className="text-muted-foreground truncate">{preview}</p>
      </div>
    </div>
  );
}
