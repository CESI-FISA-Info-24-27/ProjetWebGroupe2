import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleBanUser, toggleSuspendUser } from "@/reducers/userSlice";

export default function AdminProfileCard({user} : {user:any}) {
  const dispatch = useAppDispatch();
  const adminToken = useAppSelector((state) => state.auth.token) || "";

  const toggleBan = (id: any) => {
    dispatch(toggleBanUser({id, token: adminToken}));
  }

  const toggleSuspend = (id: any) => {
    dispatch(toggleSuspendUser({id, token: adminToken}));
  }

  return (
    <Card className="flex flex-row items-center justify-center transition-all duration-300 ease-in-out lg:hover:scale-102 m-4 p-2">
      <Link to={"/profile/" + user?.userName} className="w-[70%] lg:text-xl md:text-lg hover:text-purple-600">{user?.userName}</Link>
      {user.state === "normal" && (
        <>
        <Button onClick={() => toggleSuspend(user?._id)} title="Suspendre l'utilisateur" className="w-10 h-10 bg-gray-600 hover:bg-gray-500 cursor-pointer">
          <i className="bi bi-pause-circle"></i>
        </Button>
        <Button onClick={() => toggleBan(user?._id )} title="Bannir l'utilisateur" className="w-10 h-10 bg-red-700 hover:bg-red-600 cursor-pointer">
          <i className="bi bi-x-octagon"></i>
        </Button>
        </>
      )}
      {user.state === "banned" && (
        <>
        <div className="w-10 h-10"/>
        <Button onClick={() => toggleBan(user?._id )} title="Débannir l'utilisateur" className="w-10 h-10 bg-green-700 hover:bg-green-600 cursor-pointer">
          <i className="bi bi-arrow-counterclockwise"></i>
        </Button>
        </>
      )}
      {user.state === "suspended" && (
        <>
        <Button onClick={() => toggleSuspend(user?._id)} title="Rétablir l'utilisateur" className="w-10 h-10 bg-green-700 hover:bg-green-600 cursor-pointer">
          <i className="bi bi-play-circle"></i>
        </Button>
        <div className="w-10 h-10"/>
        </>
      )}
    </Card>
  )
}