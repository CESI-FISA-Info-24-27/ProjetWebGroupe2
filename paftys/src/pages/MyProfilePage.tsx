import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UserPostsComponent from "@/components/profile/UserPostsComponent";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import isEmptyHelper from "@/utils/isEmptyHelper";
import { fetchPostsByUserId } from "@/reducers/postSlice";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditProfileComponent from "@/components/profile/EditProfileComponent";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import ProfileComponent from "@/components/shared/ProfileComponent";
import { ScrollArea } from "@/components/ui/scroll-area";
import defaultProfile from "@/assets/default.png";
import { useEffect, useState } from "react";

export default function MyProfilePage() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  dispatch(fetchPostsByUserId({ userId: user?.id || "" }));

  const baseUrl = import.meta.env.VITE_DB_URI;
  const profilePictureUrl = `${baseUrl}/uploads/profiles/${user?.profilePicture}`;

  // Add local state for subscribers and subscriptions
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      setSubscribers(user.subscribers || []);
      setSubscriptions(user.subscriptions || []);
    }
  }, [user]);

  return !isEmptyHelper(user) ? (
    <div className="flex flex-col items-center h-screen p-4 max-w-[100%] w-full pb-14">
      <Card className="w-full lg:w-[70%] mx-auto p-6 flex flex-col items-center rounded-xl shadow-md mb-4">
        <div className="flex flex-col justify-around w-full items-center mb-6 md:flex-row">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-semibold text-center">
              {user ? user.userName : "Utilisateur inconnu"}
            </h2>
            <img
              src={user?.profilePicture ? profilePictureUrl : defaultProfile}
              alt="Photo de profil"
              className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover mb-4 border-2 border-gray-200"
            />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
            <HoverCard>
              <HoverCardTrigger>
                <div className="cursor-pointer transition-transform duration-300 hover:scale-105">
                  {subscribers && subscribers.length > 0 ? (
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
                    <p className="self-center">{subscribers.length} Abonnés </p>
                    <ScrollArea>
                      <div className="max-h-60">
                        <div className="flex flex-col gap-4 w-full">
                          {subscribers.map((sub) => (
                            <ProfileComponent
                              key={sub._id}
                              image={sub.profilePicture}
                              userName={sub.userName}
                              biography={sub.biography}
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
                      {subscriptions.length} Abonnements
                    </span>
                  ) : (
                    <span className="text-gray-500">0 Abonnements</span>
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
                    <p className="self-center">
                      {subscriptions.length} Abonnements{" "}
                    </p>
                    <ScrollArea>
                      <div className="max-h-60">
                        <div className="flex flex-col gap-4 w-full">
                          {subscriptions.map((sub) => (
                            <ProfileComponent
                              key={sub._id}
                              image={sub.profilePicture}
                              userName={sub.userName}
                              biography={sub.biography}
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

          <Dialog>
            <DialogTrigger>
              <Button className="cursor-pointer">Modifier le profil</Button>
            </DialogTrigger>
            <DialogContent className="max-w-screen custom-scrollbar overflow-y-auto max-h-[90%]">
              <EditProfileComponent user={user} />
            </DialogContent>
          </Dialog>
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
      <p className="text-gray-500">Chargement...</p>
    </div>
  );
}
