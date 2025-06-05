import PostComponent from "@/components/PostComponent";
import type Post from "@/models/Post";
import { useAppSelector } from "@/redux/hooks";
import isEmptyHelper from "@/utils/isEmptyHelper";
import LoadingComponent from "@/components/LoadingComponent";
import SubNavBar from "@/components/SubNavBar";

export default function HomeComponent() {
  const posts = useAppSelector((state) => state.post.posts);
  const loading = useAppSelector((state) => state.post.loading);

  const parsedPosts = posts.map((post) => ({
    ...post,
    createdAt: new Date(),
    updatedAt: new Date(post.updatedAt),
    date: post.date ? new Date(post.date) : new Date(),
  }));

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <div className="flex">
        <SubNavBar />
        {!isEmptyHelper(parsedPosts) &&
          parsedPosts.map((post: Post) => (
            <PostComponent key={post._id} {...post} />
          ))}
        {(loading || isEmptyHelper(parsedPosts)) && (
          <LoadingComponent message="Chargement des posts..." />
        )}
      </div>
    </div>
  );
}
