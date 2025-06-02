import { Component } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface UserForPost {
  _id: string;
  username: string;
  profilePicture: string;
  bio: string;
}

export interface Message {
  id_string: string;
  message: string;
}

export interface PostComponentProps {
  user: UserForPost;
  message: Message;
  date: Date;
}

interface PostComponentState {
  expanded: boolean;
}

export default class PostComponent extends Component<
  PostComponentProps,
  PostComponentState
> {
  constructor(props: PostComponentProps) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  toggleExpanded = () => {
    this.setState((prevState) => ({ expanded: !prevState.expanded }));
  };

  render() {
    const { user, message, date } = this.props;
    const { expanded } = this.state;

    const shouldTruncate = message.message.length > 240;

    return (
      <Card className="w-fit gap-2">
        <CardHeader className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-2">
            <img
              src={user.profilePicture}
              alt={`Profil de ${user.username}`}
              className="w-[40px] h-[40px] rounded-full cursor-pointer"
            />
            <CardTitle className="username-underline cursor-pointer">{`@${user.username}`}</CardTitle>
          </div>

          <span className="text-sm text-gray-500">
            Posté le {date.toLocaleString()}
          </span>
        </CardHeader>
        <CardContent className="w-[600px]">
          <p>
            {shouldTruncate && !expanded
              ? message.message.slice(0, 240) + "..."
              : message.message}{" "}
            {shouldTruncate && (
              <a
                onClick={this.toggleExpanded}
                className="underline text-blue-500 hover:text-blue-700 cursor-pointer"
              >
                {expanded ? "Voir moins" : "Lire la suite"}
              </a>
            )}
          </p>
        </CardContent>
      </Card>
    );
  }
}
