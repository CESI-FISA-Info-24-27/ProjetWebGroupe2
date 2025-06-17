import PostComponent from "@/components/shared/PostComponent";
import type Post from "@/models/Post";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import isEmptyHelper from "@/utils/isEmptyHelper";
import LoadingComponent from "@/components/shared/LoadingComponent";
import { useEffect } from "react";
import { fetchPostsByTag } from "@/reducers/tagsSlice";
import { NavLink, useLocation } from "react-router-dom";
import RightSideBar from "@/components/shared/RightSideBarComponent";

export default function TagPage() {
  const location = useLocation();
  const tagId = location.pathname.split("/").pop();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPostsByTag({ postId: tagId || "" }));
  }, []);

  const posts = useAppSelector((state) => state.tags.postsByTags);

  const parsedPosts = posts.map((post) => ({
    ...post,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
    date: post.date ? new Date(post.date) : new Date(),
  }));

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen w-full justify-between">
        <div className="flex flex-col items-center w-full md:w-[100%] h-full overflow-y-auto custom-scrollbar">
          <div className="text-purple-700 text-4xl border-b border-gray-700 w-full justify-center flex items-center p-4">
            <NavLink to={`/tags/${tagId}`}>
              <p className="cursor-pointer transition-transform duration-300 hover:translate-y-[-2px]">
                #{tagId}
              </p>
            </NavLink>
          </div>

          {!isEmptyHelper(parsedPosts) &&
            parsedPosts.map((post: Post) => (
              <div
                className="mt-4 w-[95%] sm:w-[90%] lg:w-[70%]"
                key={post._id}
              >
                <PostComponent {...post} />
              </div>
            ))}
          {isEmptyHelper(parsedPosts) && (
            <LoadingComponent message={"Chargement des posts..."} />
          )}
        </div>
      </div>
    </>
  );
}
