import { useAppSelector } from "@/redux/hooks";
import { Card } from "./ui/card";
import PostComponent from "./PostComponent";

export default function UserPosts() {
  const userPosts = useAppSelector((state) => state.postReducer);
  return (
    <Card className="w-full mx-auto p-6 flex flex-col items-center rounded-xl shadow-md">
      {/*!isEmptyHelper(userPosts) &&*/ userPosts.map((post: any) => (
        <PostComponent key={post._id} {...post}/>
      ))}
    </Card>
  )};