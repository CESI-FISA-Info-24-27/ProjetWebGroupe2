import { NavLink } from "react-router-dom";

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
  {
    id:"1",
    name:"#JavaScript",
    nbPost:"22"
  },
  "#ReactJS",
  "#TypeScript",
  "#Web3",
  "#TailwindCSS",
];

export default function SubNavBar() {
  return (
    <div className="w-[20%] h-full bg-[#18181B] border-l border-gray-700 p-4 flex flex-col gap-6 text-white fixed top-0 right-0 overflow-y-auto">
      <div>
        <h2 className="text-xl font-semibold mb-2">Comptes recommandés</h2>
        {recommendedUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#27272A] transition-colors"
          >
            <img
              src={user.profilePicture}
              alt={user.username}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <NavLink
                to={`/profile/${user.username}`}
                className="font-medium text-white hover:underline"
              >
                @{user.username}
              </NavLink>
              <p className="text-sm text-gray-400">{user.bio}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Tags en trend</h2>
        <ul className="flex flex-col gap-2">
          {trendingTags.map((tag, index) => (
            <li key={tag} className="text-gray-300">
              <span className="font-bold text-white mr-2">{index + 1}.</span>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
