import AdminProfileCard from "@/components/profile/AdminProfileCard";
import { Card } from "@/components/ui/card";
import { fetchUsers } from "@/reducers/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import isEmptyHelper from "@/utils/isEmptyHelper";
import { useEffect } from "react";

export default function AdminPage() {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const usersData = useAppSelector((state) => state.user.users)

  useEffect(() => {
    if (auth) {
      dispatch(fetchUsers(auth?.token || ""))
    }
  }, []);

  useEffect(() => {
    if (auth.user?.role !== "admin" && auth.user?.role !== "moderator") {
      window.location.href = "/404";
    }
  }, []);
  return (
    <div className="flex flex-col items-center h-screen p-4 max-w-[100%] w-full">
      <Card className="w-full h-full flex items-center justify-center">
        <h1 className="text-4xl font-bold">Administration</h1>
      </Card>
      <div className="flex w-full h-[85%] m-4 gap-4">
        <Card className="flex flex-col gap-0 w-full overflow-y-auto custom-scrollbar">
        {!isEmptyHelper(usersData) && usersData.map((user) => (
          <AdminProfileCard key={user.id} user={user} />
        ))}
        </Card>
        <Card className="w-full">
          Signalements
        </Card>
      </div>
    </div>
  );
}