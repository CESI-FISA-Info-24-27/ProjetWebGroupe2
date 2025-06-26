import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleBanUser, toggleSuspendUser } from "@/reducers/userSlice";
import { toast } from "sonner";

export default function AdminProfileCard({ user }: { user: any }) {
  const dispatch = useAppDispatch();
  const adminToken = useAppSelector((state) => state.auth.token) || "";

  const toggleBan = (id: any, banned: boolean) => {
    dispatch(toggleBanUser({ id, token: adminToken }));
    if (banned) {
      toast.success("Vous avez banni un utilisateur.", {
        position: "bottom-center",
      });
    } else {
      toast.success("Vous avez débanni un utilisateur.", {
        position: "bottom-center",
      });
    }
  };

  const toggleSuspend = (id: any, suspended: boolean) => {
    dispatch(toggleSuspendUser({ id, token: adminToken }));
    if (suspended) {
      toast.success("Vous avez suspendu un utilisateur.", {
        position: "bottom-center",
      });
    } else {
      toast.success("Vous avez rétabli un utilisateur.", {
        position: "bottom-center",
      });
    }
  };

  return (
    <Card className="flex flex-row items-center justify-center transition-all duration-300 ease-in-out lg:hover:scale-102 m-4 p-2">
      <Link
        to={"/profile/" + user?.userName}
        className="w-[70%] lg:text-xl md:text-lg hover:text-purple-600"
      >
        {user?.userName} (
        {user?.state === "banned"
          ? "Banni"
          : user?.state === "suspended"
          ? "Suspendu"
          : "Aucune restriction"}
        )
      </Link>
      {user.state === "normal" && (
        <>
          <Button
            onClick={() => toggleSuspend(user?._id, true)}
            title="Suspendre l'utilisateur"
            className="w-10 h-10 bg-gray-600 hover:bg-gray-500 cursor-pointer"
          >
            <i className="bi bi-pause-circle"></i>
          </Button>
          <Button
            onClick={() => toggleBan(user?._id, true)}
            title="Bannir l'utilisateur"
            className="w-10 h-10 bg-red-700 hover:bg-red-600 cursor-pointer"
          >
            <i className="bi bi-x-octagon"></i>
          </Button>
        </>
      )}
      {user.state === "banned" && (
        <>
          <div className="w-10 h-10" />
          <Button
            onClick={() => toggleBan(user?._id, false)}
            title="Débannir l'utilisateur"
            className="w-10 h-10 bg-green-700 hover:bg-green-600 cursor-pointer"
          >
            <i className="bi bi-arrow-counterclockwise"></i>
          </Button>
        </>
      )}
      {user.state === "suspended" && (
        <>
          <Button
            onClick={() => toggleSuspend(user?._id, false)}
            title="Rétablir l'utilisateur"
            className="w-10 h-10 bg-green-700 hover:bg-green-600 cursor-pointer"
          >
            <i className="bi bi-play-circle"></i>
          </Button>
          <div className="w-10 h-10" />
        </>
      )}
    </Card>
  );
}
