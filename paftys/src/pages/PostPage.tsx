import CreatePost from "@/components/shared/CreatePost";
import LoadingComponent from "@/components/shared/LoadingComponent";
import PostComponent from "@/components/shared/PostComponent";
import { Card } from "@/components/ui/card";
import type Post from "@/models/Post";
import { fetchPostById } from "@/reducers/postSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import isEmptyHelper from "@/utils/isEmptyHelper";
import { useEffect, useState } from "react";

export function PostPage() {
  const [showNoResponseMessage, setShowNoResponseMessage] = useState(false);
  const postId = window.location.pathname.split("/").pop();
  const dispatch = useAppDispatch();
  const postData = useAppSelector((state) => state.post.posts);
  const loading = useAppSelector((state) => state.post.loading);
  const authUser = useAppSelector((state) => state.auth.user);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const handleReplyClick = () => setShowReplyForm(true);
  const handlePostSubmit = () => {
    setShowReplyForm(false);
  };

  const toggleReplyForm = () => {
    setShowReplyForm((prev) => !prev);
  };

  const parsedPosts = postData.map((post) => ({
    ...post,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
    date: post.date ? new Date(post.date) : new Date(),
  }));

  const post = parsedPosts.find((p) => p._id === postId);

  let responses: Post[] = [];
  if (post && post.replies && post.replies.length > 0) {
    responses = post.replies
      .map((replyId) => parsedPosts.find((p) => p._id === replyId))
      .filter((p): p is Post => !!p);

    responses.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostById({ postId }));
    }
  }, [dispatch, postId]);

  useEffect(() => {
    if (isEmptyHelper(responses) && !loading) {
      const timer = setTimeout(() => {
        setShowNoResponseMessage(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowNoResponseMessage(false);
    }
  }, [responses, loading]);

  if (loading && isEmptyHelper(parsedPosts)) {
    return (
      <div className="flex flex-col p-4 min-h-screen w-full ">
        <LoadingComponent message="Chargement du post..." />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col p-4 min-h-screen w-full">
        <Card className="w-full lg:w-[70%] mx-auto p-8 items-center rounded-xl shadow-md mb-4">
          Post non trouvé
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 h-screen w-full pb-14">
      <div className="max-h-screen overflow-y-auto custom-scrollbar">
        <Card className="w-full lg:w-[70%] mx-auto p-8 items-center rounded-xl shadow-md mb-4">
          <PostComponent
            postData={post}
            showReplyButton={authUser?.state !== "suspended" || false}
            onReplyClick={handleReplyClick}
          />
        </Card>

        {showReplyForm && (
          <Card className="w-full lg:w-[70%] mx-auto p-4 sm:p-6 md:p-8 rounded-xl shadow-md mb-4 break-words overflow-x-hidden">
            <CreatePost repliesTo={post._id} />
          </Card>
        )}

        {!isEmptyHelper(responses) && (
          <Card className="w-full lg:w-[70%] mx-auto p-4 sm:p-6 md:p-8 rounded-xl shadow-md mb-4 break-words overflow-x-hidden">
            Réponse{responses.length > 1 ? "s" : ""} :
            <div className="ml-6 mt-4 border-l-2 border-gray-300 pl-4 gap-2">
              {responses.map((response: Post) => (
                <div className="mb-5">
                  <PostComponent key={response._id} postData={response} />
                </div>
              ))}
            </div>
          </Card>
        )}

        {isEmptyHelper(responses) &&
          (!showNoResponseMessage ? (
            <LoadingComponent message="Chargement des réponses..." />
          ) : (
            <Card className="w-full lg:w-[70%] mx-auto p-8 items-center rounded-xl shadow-md mb-4">
              Aucune réponse pour le moment.
            </Card>
          ))}
      </div>
    </div>
  );
}
