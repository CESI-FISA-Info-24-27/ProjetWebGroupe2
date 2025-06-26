import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { CardTitle } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { NavLink } from "react-router-dom";
import defaultProfile from "@/assets/default.png";

interface UserComponentProps {
  image: string;
  userName: string;
  biography: string;
  condensed: boolean;
}

export default function ProfileComponent({
  image,
  userName,
  biography,
  condensed = false,
}: UserComponentProps) {
  const baseUrl = import.meta.env.VITE_DB_URI;

  const getProfilePictureUrl = (image: string, baseUrl: string) => {
    if (!image) return "https://randomuser.me/api/portraits/lego/1.jpg";
    if (image.startsWith("http") || image.startsWith("blob:")) return image;
    return `${baseUrl}/uploads/profiles/${image}`;
  };

  const avatar = (
    <Avatar className={condensed ? "" : "w-14 h-14"}>
      <AvatarImage
        src={getProfilePictureUrl(image, baseUrl)}
        alt={`@${userName}`}
      />
      <AvatarFallback>
        <img src={defaultProfile} alt="default profile"></img>
      </AvatarFallback>
    </Avatar>
  );

  const usernameAndBio = condensed ? (
    <NavLink to={`/profile/${userName}`}>
      <CardTitle className="custom-underline truncate">@{userName}</CardTitle>
    </NavLink>
  ) : (
    <div className="flex flex-col w-full break-words">
      <NavLink to={`/profile/${userName}`}>
        <CardTitle className="custom-underline w-fit">@{userName}</CardTitle>
      </NavLink>
      <div className="text-sm text-gray-500 break-words">{biography}</div>
    </div>
  );

  const content = (
    <div className="flex items-center gap-2">
      <NavLink to={`/profile/${userName}`}>{avatar}</NavLink>
      {usernameAndBio}
    </div>
  );

  return (
    <>
      {condensed ? (
        <HoverCard>
          <HoverCardTrigger>{content}</HoverCardTrigger>
          <HoverCardContent className="w-64">
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={getProfilePictureUrl(image, baseUrl)}
                    alt={`@${userName}`}
                  />
                  <AvatarFallback>                      
                    {typeof userName === "string" && userName.length > 0 ? userName[0].toUpperCase(): "?"}</AvatarFallback>
                </Avatar>
                  <p className="font-semibold text-sm">@{userName || "Utilisateur"}</p>
              </div>
              <p className="text-sm text-gray-100 break-words">{biography}</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      ) : (
        content
      )}
    </>
  );
}
