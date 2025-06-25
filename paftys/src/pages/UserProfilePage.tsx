import UserPostsComponent from "@/components/profile/UserPostsComponent";
import LoadingComponent from "@/components/shared/LoadingComponent";
import ProfileComponent from "@/components/shared/ProfileComponent";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchPostsByUserId } from "@/reducers/postSlice";
import { fetchUserById } from "@/reducers/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import isEmptyHelper from "@/utils/isEmptyHelper";
import { useEffect, useState } from "react";
import { toggleSubscription } from "@/reducers/userSlice";
import { toast, Toaster } from "sonner";

export default function UserProfilePage() {
  const userName = window.location.pathname.split("/").pop();
  const dispatch = useAppDispatch();
  const me = useAppSelector((state) => state.auth.user);
  const user = useAppSelector((state) => state.user.selectedUser);

  const baseUrl = import.meta.env.VITE_DB_URI;
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

  const handleSubscriptionToggle = () => {
    const isSubscribed = subscribers.some((sub) => sub._id === me?.id);

    dispatch(toggleSubscription({ userId: user?.id ?? "" }));

    if (isSubscribed) {
      toast.success(`Vous vous êtes désabonné de ${user?.userName}.`, {
        position: "bottom-center",
      });
    } else {
      toast.success(`Vous vous êtes abonné à ${user?.userName}.`, {
        position: "bottom-center",
      });
    }
  };

  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      setSubscribers(user.subscribers || []);
      setSubscriptions(user.subscriptions || []);
    }
  }, [user]);

  return !isEmptyHelper(user) ? (
    <div className="flex flex-col items-center h-screen p-4 max-w-[100%] w-full">
      <Toaster richColors />
      <Card className="w-full lg:w-[70%] mx-auto p-6 flex flex-col items-center rounded-xl shadow-md mb-4">
        <div className="flex flex-col justify-around w-full items-center mb-6 md:flex-row">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-semibold text-center">
              {user ? user.userName : "Utilisateur inconnu"}
            </h2>
            <img
              src={
                profilePictureUrl ??
                "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
              }
              alt="Photo de profil"
              className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover mb-4 border-2 border-gray-200"
            />
            <Button
              className="cursor-pointer"
              onClick={handleSubscriptionToggle}
            >
              {subscribers.some((subscribers) => subscribers._id === me?.id)
                ? "Se désabonner"
                : "S'abonner"}
            </Button>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
            <HoverCard>
              <HoverCardTrigger>
                <div className="cursor-pointer transition-transform duration-300 hover:scale-105">
                  {user?.subscribers && user.subscribers.length > 0 ? (
                    <span className="text-purple-500">
                      {subscribers.length} Abonnés
                    </span>
                  ) : (
                    <span className="text-gray-500">0 Abonnés</span>
                  )}
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="flex flex-col gap-4">
                {!subscribers || subscribers.length === 0 ? (
                  <>
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-center">
                        Personne n'est encore abonné à ce profil.
                      </p>
                      <div className="bi bi-emoji-frown text-5xl"></div>
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <p className="self-center">{subscribers.length} Abonnés </p>
                    <ScrollArea>
                      <div className="max-h-60">
                        <div className="flex flex-col gap-4 w-full">
                          {subscribers.map((user) => (
                            <ProfileComponent
                              key={user._id}
                              image={user.profilePicture}
                              userName={user.userName}
                              biography={user.biography}
                              condensed={false}
                            />
                          ))}
                        </div>
                      </div>
                    </ScrollArea>
                  </>
                )}
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger>
                <div className="cursor-pointer transition-transform duration-300 hover:scale-105">
                  {subscriptions && subscriptions.length > 0 ? (
                    <span className="text-purple-500">
                      {subscriptions.length} Abbonnements
                    </span>
                  ) : (
                    <span className="text-gray-500">0 Abbonnements</span>
                  )}
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="flex flex-col gap-4">
                {!subscriptions || subscriptions.length === 0 ? (
                  <>
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-center">
                        Ce profil ne suit actuellement personne.
                      </p>
                      <div className="bi bi-emoji-frown text-5xl"></div>
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <p className="self-center">
                      {subscriptions.length} Abbonnements{" "}
                    </p>
                    <ScrollArea>
                      <div className="max-h-60">
                        <div className="flex flex-col gap-4 w-full">
                          {subscriptions.map((user) => (
                            <ProfileComponent
                              key={user._id}
                              image={user.profilePicture}
                              userName={user.userName}
                              biography={user.biography}
                              condensed={false}
                            />
                          ))}
                        </div>
                      </div>
                    </ScrollArea>
                  </>
                )}
              </HoverCardContent>
            </HoverCard>
          </div>
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
