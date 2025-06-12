export default function MessageDisplayComponent() {
  return (
    <>
      <div className="flex gap-4 w-[300px] bg-[#1f1f23] p-4 rounded-2xl">
        <img
          src="https://randomuser.me/api/portraits/men/21.jpg"
          className="h-15 w-15 rounded-full"
        ></img>
        <div className="flex flex-col">
          <p className="text-xl">John Doe</p>
          <p className="text-gray-500">Récemment il se passe ...</p>
        </div>
      </div>
    </>
  );
}
