import PostComponent from "@/components/PostComponent";
import { fetchPosts } from "@/reducers/postSlice";
import type Post from "@/models/Post";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import isEmptyHelper from "@/utils/isEmptyHelper";
import LoadingComponent from "@/components/LoadingComponent";
import SubNavBar from "@/components/SubNavBar";
import { useEffect } from "react";

export default function HomeComponent() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const posts = useAppSelector((state) => state.post.posts);

  const parsedPosts = posts.map((post) => ({
    ...post,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
    date: post.date ? new Date(post.date) : new Date(),
  }));

  return (
    <div className="flex flex-row h-screen w-full justify-between">
      <div className="flex flex-col items-center w-[70%] h-full overflow-y-auto">
        {!isEmptyHelper(parsedPosts) &&
          parsedPosts.map((post: Post) => (
            <div className="mt-4">
              <PostComponent key={post._id} {...post} />
            </div>
          ))}
        {isEmptyHelper(parsedPosts) && (
          <LoadingComponent message={"Chargement des posts..."} />
        )}
      </div>
      <SubNavBar />
    </div>
  );
}
