import { Component } from "react";
import PostComponent from "@/components/PostComponent";
import type { PostComponentProps } from "@/components/PostComponent";
const randomPosts: PostComponentProps[] = [
  {
    user: {
      _id: "u1",
      username: "alice42",
      profilePicture: "https://randomuser.me/api/portraits/women/42.jpg",
      bio: "Web developer & coffee lover ☕",
    },
    message: {
      _id: "m1",
      message: "Just finished a new React project! 🚀",
      likes: 120,
      comments: 45,
    },
    date: new Date("2024-06-01T10:00:00Z"),
  },
  {
    user: {
      _id: "u2",
      username: "bob_dev",
      profilePicture: "https://randomuser.me/api/portraits/men/34.jpg",
      bio: "Full-stack engineer. Building cool stuff.",
    },
    message: {
      _id: "m2",
      message:
        "Anyone going to the next JS meetup?Anyone going to the next JS meetup?Anyone going to the next JS meetup?Anyone going to the next JS meetup?Anyone going to the next JS meetup?Anyone going to the next JS meetup?Anyone going to the next JS meetup?Anyone going to the next JS meetup?Anyone going to the next JS meetup?Anyone going to the next JS meetup?Anyone going to the next JS meetup?Anyone going to the next JS meetup?",
      likes: 120,
      comments: 45,
    },
    date: new Date("2024-06-01T12:15:00Z"),
  },
  {
    user: {
      _id: "u3",
      username: "charlie",
      profilePicture: "https://randomuser.me/api/portraits/men/12.jpg",
      bio: "Music, code, repeat.",
    },
    message: {
      _id: "m3",
      message:
        "Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶Listening to some great synthwave while coding 🎶",
      likes: 120,
      comments: 45,
    },
    date: new Date("2024-06-01T15:30:00Z"),
  },
  {
    user: {
      _id: "u4",
      username: "diana",
      profilePicture: "https://randomuser.me/api/portraits/women/55.jpg",
      bio: "UI/UX designer. Making the web beautiful.",
    },
    message: {
      _id: "m4",
      message: "Check out my latest Dribbble shot!",
      likes: 120,
      comments: 45,
    },
    date: new Date("2024-06-01T18:45:00Z"),
  },
];

export default class HomeComponent extends Component {
  render() {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        {randomPosts.map((post) => (
          <PostComponent key={post.message._id} {...post} />
        ))}
      </div>
    );
  }
}
