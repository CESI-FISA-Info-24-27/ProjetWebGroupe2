import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UserPosts from "@/components/UserPosts";
import { useAppSelector } from "@/redux/hooks";
import isEmptyHelper from "@/utils/isEmptyHelper";

export default function MyProfilePage() {
  const user = useAppSelector((state) => state.auth.user);
  return !isEmptyHelper(user) ? (
    <div className="flex flex-col items-center min-h-screen p-4">
      <Card className="w-full mx-auto p-6 flex flex-col items-center rounded-xl shadow-md">
        <div className="flex flex-col justify-around w-full items-center mb-6 md:flex-row">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
            alt="Photo de profil"
            className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover mb-4 border-2 border-gray-200"
            />
          <h2 className="text-2xl font-semibold mb-2 text-center">
            {user ? user.userName : "Nom d'utilisateur"}
          </h2>
          <Button className="cursor-pointer">Modifier le profil</Button>
        </div>
        <p className="text-base text-white text-center m-0">
          {user ? (user.biography ? user.biography :  "Aucune biographie.") : "Aucune biographie."}
        </p>
      </Card>
      <UserPosts />
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500">Chargement...</p>
    </div>
  );
}