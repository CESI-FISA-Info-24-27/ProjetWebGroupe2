import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingTags } from "@/reducers/tagsSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import ProfileComponent from "./ProfileComponent";
import isEmptyHelper from "@/utils/isEmptyHelper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function RightSideBar() {
  const dispatch = useAppDispatch();
  const trendingTags = useAppSelector((state) => state.tags.trendingTags);
  const API_BASE_URL = import.meta.env.VITE_DB_URI + "/api/users";

  const [mostFollowed, setMostFollowed] = useState<any[]>([]);

  useEffect(() => {
    dispatch(fetchTrendingTags());

    axios
      .get(`${API_BASE_URL}/most-followed?limit=3`)
      .then((res) => setMostFollowed(res.data.data))
      .catch(() => setMostFollowed([]));
  }, []);

  return (
    <div className="hidden md:flex w-[30%] h-screen bg-sidebar text-sidebar-foreground border-l border-sidebar-border p-4 flex-col gap-6 overflow-y-auto transition-colors">
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold mb-2">Comptes recommandés</h2>
        <div className="flex flex-col gap-4">
          {mostFollowed.length > 0 ? (
            mostFollowed.map((user) => (
              <ProfileComponent
                key={user._id}
                image={user.profilePicture}
                userName={user.userName}
                biography={user.biography}
                condensed={false}
              />
            ))
          ) : (
            <div className="text-gray-500">Aucun compte recommandé</div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Tags en trend</h2>
        <ul className="flex flex-col gap-2">
          {!isEmptyHelper(trendingTags) &&
            trendingTags.slice(0, 5).map((tag, index) => (
              <li key={tag._id} className="text-muted-foreground">
                <div className="flex items-center">
                  <span className="font-bold mr-2">{index + 1}.</span>
                  <NavLink to={`/tags/${tag._id}`}>
                    <div className="text-purple-700 cursor-pointer hover:underline">
                      {"#" + tag._id}
                    </div>
                  </NavLink>
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                    ({tag.count} posts)
                  </span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
