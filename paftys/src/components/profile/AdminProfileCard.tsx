import { Button } from "../ui/button";
import { Card } from "../ui/card";

type User = {
  id: string;
  email: string;
  userName: string;
  biography: string;
  profilePicture: string;
  conversations: string[];
  notifications: string[];
  posts: string[];
  role: string;
  state: string;
} | null;


export default function AdminProfileCard({user} : {user:User}) {
  return (
    <Card className="flex flex-row items-center justify-center m-4 p-2">
      <p className="w-[70%] lg:text-xl md:text-lg">{user?.userName}</p>
      <Button title="Suspendre l'utilisateur" className="w-10 h-10"><i className="bi bi-pause-circle"></i></Button>
      <Button title="Bannir l'utilisateur" className="w-10 h-10"><i className="bi bi-x-octagon"></i></Button>
    </Card>
  )
}