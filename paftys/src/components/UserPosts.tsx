import { useAppSelector } from "@/redux/hooks";
import { Card } from "./ui/card";
import PostComponent from "./PostComponent";
import isEmptyHelper from "@/utils/isEmptyHelper";

export default function UserPosts() {
  const userPosts = useAppSelector((state) => state.post.posts);
  return (
    <Card className="w-full mx-auto p-6 flex flex-col items-center rounded-xl shadow-md">
      {!isEmptyHelper(userPosts) && userPosts.map((post: any) => (
        // <PostComponent key={post._id} {...post}/>
        <p>test</p>
      ))}
    </Card>
  )};