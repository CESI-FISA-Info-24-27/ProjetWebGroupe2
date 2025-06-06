import PostComponent from "@/components/PostComponent";
import type Post from "@/models/Post";
import { useAppSelector } from "@/redux/hooks";
import isEmptyHelper from "@/utils/isEmptyHelper";
import LoadingComponent from "@/components/LoadingComponent";
import SubNavBar from "@/components/SubNavBar";
import { Sub } from "@radix-ui/react-dropdown-menu";
export default function HomeComponent() {
  const posts = useAppSelector((state) => state.postReducer || []);

  const parsedPosts = Array.isArray(posts)
    ? posts.map((post: Post) => ({
        ...post,
        date: new Date(post.date),
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt),
      }))
    : [];

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
