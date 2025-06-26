import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UserPostsComponent from "@/components/profile/UserPostsComponent";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import isEmptyHelper from "@/utils/isEmptyHelper";
import { fetchPostsByUserId } from "@/reducers/postSlice";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchPostsByUserId({ userId: user.id }));
    }
  }, [dispatch, user?.id]);

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
    <div className="flex flex-col items-center h-screen p-4 pb-14 max-w-[100%] w-full text-foreground transition-colors">
      <Card className="w-full gap-0 lg:max-w-[70%] mx-auto p-4 flex flex-col items-center rounded-xl shadow-md mb-4 text-sidebar-foreground transition-colors">
        <div className="flex flex-row justify-around w-full items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-xl font-semibold text-center">
              {user ? user.userName : "Utilisateur inconnu"}
            </h2>
            <img
              src={user?.profilePicture ? profilePictureUrl : defaultProfile}
              alt="Photo de profil"
              className="w-12 h-12 lg:w-28 lg:h-28 rounded-full object-cover mb-2 border-2 border-sidebar-border"
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            <HoverCard>
              <HoverCardTrigger>
                <div className="cursor-pointer transition-transform duration-300 hover:scale-105">
                  {subscribers && subscribers.length > 0 ? (
                    <span className="text-purple-500">
                      {subscribers.length} Abonnés
                    </span>
                  ) : (
                    <span className="text-muted-foreground">0 Abonnés</span>
                  )}
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="flex flex-col gap-4 bg-sidebar text-sidebar-foreground transition-colors">
                {!subscribers || subscribers.length === 0 ? (
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-center">
                      Personne n'est encore abonné à ce profil.
                    </p>
                    <div className="bi bi-emoji-frown text-5xl"></div>
                  </div>
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
                    <span className="text-muted-foreground">0 Abonnements</span>
                  )}
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="flex flex-col gap-4 bg-sidebar text-sidebar-foreground transition-colors">
                {!subscriptions || subscriptions.length === 0 ? (
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-center">
                      Ce profil ne suit actuellement personne.
                    </p>
                    <div className="bi bi-emoji-frown text-5xl"></div>
                  </div>
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
              {/* Mobile: icon button, Desktop: normal button */}
              <Button
                className="cursor-pointer p-2 md:hidden"
                variant="ghost"
                size="icon"
                aria-label="Modifier le profil"
              >
                <span className="bi bi-pencil-square text-xl" />
              </Button>
              <Button
                className="cursor-pointer hidden md:inline-flex"
                aria-label="Modifier le profil"
              >
                Modifier le profil
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-screen custom-scrollbar overflow-y-auto max-h-[90%]">
              <EditProfileComponent user={user} />
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-base text-muted-foreground text-center m-0">
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
      <p className="text-muted-foreground">Chargement...</p>
    </div>
  );
}
