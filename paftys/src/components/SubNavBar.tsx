import { NavLink } from "react-router-dom";
import ProfileComponent from "./ProfileComponent";
const recommendedUsers = [
  {
    id: "1",
    username: "alice42",
    profilePicture: "https://randomuser.me/api/portraits/women/42.jpg",
    bio: "Web developer & coffee lover",
  },
  {
    id: "2",
    username: "bob_dev",
    profilePicture: "https://randomuser.me/api/portraits/men/34.jpg",
    bio: "Full-stack engineer. Building cool stuff.",
  },
  {
    id: "3",
    username: "dianaUX",
    profilePicture: "https://randomuser.me/api/portraits/women/55.jpg",
    bio: "UI/UX designer. Making the web beautiful.",
  },
];

const trendingTags = [
  { id: "1", name: "#JavaScript", nbPost: "22" },
  { id: "2", name: "#ReactJS", nbPost: "17" },
  { id: "3", name: "#TypeScript", nbPost: "9" },
  { id: "4", name: "#Web3", nbPost: "14" },
  { id: "5", name: "#TailwindCSS", nbPost: "11" },
];

export default function SubNavBar() {
  return (
    <div className="w-[20%] h-full bg-[#18181B] border-l border-gray-700 p-4 flex flex-col gap-6 text-white fixed top-0 right-0 overflow-y-auto">
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold mb-2">Comptes recommandés</h2>
        <div className="flex flex-col gap-4">
          {recommendedUsers.map((user) => (
            <ProfileComponent
              key={user.id}
              image={user.profilePicture}
              userName={user.username}
              biography={user.bio}
              condensed={false}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Tags en trend</h2>
        <ul className="flex flex-col gap-2">
          {trendingTags.map((tag, index) => (
            <li key={tag.id} className="text-gray-300">
              <span className="font-bold text-white mr-2">{index + 1}.</span>
              {tag.name}{" "}
              <span className="text-sm text-gray-500">
                ({tag.nbPost} posts)
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
