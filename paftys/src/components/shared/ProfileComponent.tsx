import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { CardTitle } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { NavLink } from "react-router-dom";

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
  const avatar = (
    <Avatar className={condensed ? "" : "w-14 h-14"}>
      <AvatarImage src={image} alt={`@${userName}`} />
      <AvatarFallback>{userName[0]?.toUpperCase()}</AvatarFallback>
    </Avatar>
  );

  const usernameAndBio = condensed ? (
    <NavLink to={`/profile/${userName}`}>
      <CardTitle className="username-underline truncate">@{userName}</CardTitle>
    </NavLink>
  ) : (
    <div className="flex flex-col w-full break-words">
      <NavLink to={`/profile/${userName}`}>
        <CardTitle className="username-underline w-min">@{userName}</CardTitle>
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
        <>
          <HoverCard>
            <HoverCardTrigger>{content}</HoverCardTrigger>
            <HoverCardContent className="w-64">
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={image} alt={`@${userName}`} />
                    <AvatarFallback>
                      {userName[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="font-semibold text-sm">@{userName}</p>
                </div>
                <p className="text-sm text-gray-100 break-words">{biography}</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </>
      ) : (
        content
      )}
    </>
  );
}
