import AdminProfileCard from "@/components/profile/AdminProfileCard";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fetchUsers } from "@/reducers/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import isEmptyHelper from "@/utils/isEmptyHelper";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [searchUser, setSearchUser] = useState("");
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const usersData = useAppSelector((state) => state.user.users);

  useEffect(() => {
    if (auth) {
      dispatch(fetchUsers(auth?.token || ""));
    }
  }, []);

  useEffect(() => {
    if (auth.user?.role !== "admin" && auth.user?.role !== "moderator") {
      window.location.href = "/404";
    }
  }, []);
  return (
    <div className="flex flex-col items-center h-screen p-4 max-w-[100%] w-full">
      <Card className="w-full h-[10%] flex items-center justify-center">
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
          Services de modération
        </h1>
      </Card>
      <div className="flex w-full md:h-[85%] lg:flex-row flex-col h-[75%] m-4 gap-4 custom-scrollbar">
        <Card className="flex flex-col gap-0 w-full overflow-y-auto custom-scrollbar">
          <h2 className="text-center text-xl md:text-2xl lg:text-4xl">
            Liste des utilisateurs
          </h2>
          <div className="w-full flex items-center justify-center p-4">
            <Input
              className=" w-[70%] md:w-[50%] !text-xl"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />
            <i className="bi bi-search text-3xl p-5 "></i>
          </div>
          {!isEmptyHelper(usersData) &&
            usersData
              .filter((user) =>
                user.userName.toLowerCase().includes(searchUser.toLowerCase())
              )
              .map((user) => <AdminProfileCard key={user.id} user={user} />)}
        </Card>
        {/* <Card className="w-full">
          Signalements
        </Card> */}
      </div>
    </div>
  );
}
