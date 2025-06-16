import { useAppSelector } from "@/redux/hooks";
import { Card } from "../ui/card";
import PostComponent from "../shared/PostComponent";
import isEmptyHelper from "@/utils/isEmptyHelper";

export default function UserPostsComponent() {
  const userPosts = useAppSelector((state) => state.post.posts);
  const parsedPosts = userPosts.map((post) => ({
    ...post,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
    date: post.date ? new Date(post.date) : new Date(),
  }));
  return (
    <Card className="w-full lg:w-[70%] mx-auto p-6 flex flex-col items-center rounded-xl shadow-md">
      {!isEmptyHelper(parsedPosts) &&
        parsedPosts.map((post: any) => (
          <PostComponent key={post._id} {...post} />
        ))}
    </Card>
  );
}
