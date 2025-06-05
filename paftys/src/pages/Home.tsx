import PostComponent from "@/components/PostComponent";
import type { Post } from "@/reducers/postSlice";
import { useAppSelector } from "@/redux/hooks";
import isEmptyHelper from "@/utils/isEmptyHelper";
import LoadingComponent from "@/components/LoadingComponent";
import SubNavBar from "@/components/SubNavBar";

export default function HomeComponent() {
  const posts = useAppSelector((state) => state.post.posts);

  const parsedPosts = posts.map((post) => ({
    ...post,
    createdAt: new Date(),
    updatedAt: new Date(post.updatedAt),
    date: post.date ? new Date(post.date) : new Date(),
  }));

  return (
    <div className="flex flex-row ">
      <div className="flex flex-col mt-4 justify-center items-center w-screen h-full gap-4">
        {!isEmptyHelper(parsedPosts) &&
          parsedPosts.map((post: Post) => (
            <PostComponent key={post._id} {...post} />
          ))}
        {isEmptyHelper(parsedPosts) && (
          <LoadingComponent message={"Chargement des posts..."} />
        )}
      </div>
      <SubNavBar />
    </div>
  );
}
