import UserPostsComponent from "@/components/profile/UserPostsComponent";
import LoadingComponent from "@/components/shared/LoadingComponent";
import { Card } from "@/components/ui/card";
import { fetchPostsByUserId } from "@/reducers/postSlice";
import { fetchUserById } from "@/reducers/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import isEmptyHelper from "@/utils/isEmptyHelper";
import { useEffect } from "react";

export default function UserProfilePage() {
  const userName = window.location.pathname.split("/").pop();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.users[0]);

  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5555";
  const profilePictureUrl = `${baseUrl}/uploads/profiles/${user?.profilePicture}`;

  useEffect(() => {
    if (userName) {
      dispatch(fetchUserById({ userName }));
    }
  }, [dispatch, userName]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchPostsByUserId({ userId: user.id }));
    }
  }, [dispatch, user?.id]);

  return !isEmptyHelper(user) ? (
    <div className="flex flex-col items-center h-screen p-4 max-w-[100%] w-full">
      <Card className="w-full lg:w-[70%] mx-auto p-6 flex flex-col items-center rounded-xl shadow-md mb-4">
        <div className="flex flex-col justify-around w-full items-center mb-6 md:flex-row">
          <img
            src={
              profilePictureUrl ??
              "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
            }
            alt="Photo de profil"
            className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover mb-4 border-2 border-gray-200"
          />
          <h2 className="text-2xl font-semibold mb-2 text-center">
            {user ? user.userName : "Utilisateur inconnu"}
          </h2>
        </div>
        <p className="text-base text-white text-center m-0">
          {user
            ? user.biography
              ? user.biography
              : "Aucune biographie."
            : "Aucune biographie."}
        </p>
      </Card>
      <UserPostsComponent />
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingComponent message={"Chargement du profil..."} />
    </div>
  );
}
