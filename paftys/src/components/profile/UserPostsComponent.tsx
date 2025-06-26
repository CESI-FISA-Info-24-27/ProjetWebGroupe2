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
    <Card className="w-full lg:w-[70%] overflow-y-auto custom-scrollbar max-h-full mx-auto p-6 flex flex-col items-center rounded-xl shadow-md">
      {!isEmptyHelper(parsedPosts) &&
        parsedPosts
          .sort((post: any) => post.createdAt)
          .map((post: any) => (
            <div className="mt-4 w-[95%] sm:w-[90%] lg:w-[70%]" key={post._id}>
              <PostComponent key={post._id} postData={post} />
            </div>
          ))}
      {isEmptyHelper(parsedPosts) && (
        <div className="text-center">
          Aucun post trouvé pour cet utilisateur.
        </div>
      )}
    </Card>
  );
}
