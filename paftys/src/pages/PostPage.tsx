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

  // Trouver le post principal (celui qui n'a pas de repliedTo)
  const post = parsedPosts.find((p) => !p.repliesTo);

  // Récupérer les réponses via post.replies (tableau d'IDs)
  let responses: Post[] = [];
  if (post && post.replies && post.replies.length > 0) {
    responses = post.replies
      .map((replyId) => parsedPosts.find((p) => p._id === replyId))
      .filter((p): p is Post => !!p); // filtre les undefined

    // Trier du plus récent au plus ancien (dernier commentaire en haut)
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
      <div className="flex flex-col p-4 h-screen w-full">
        <LoadingComponent message="Chargement du post..." />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col p-4 h-screen w-full">
        <Card className="w-full lg:w-[70%] mx-auto p-8 items-center rounded-xl shadow-md mb-4">
          Post non trouvé
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 h-full w-full">
      <Card className="w-full lg:w-[70%] mx-auto p-8 items-center rounded-xl shadow-md mb-4">
        <PostComponent
          postData={post}
          showReplyButton={true}
          onReplyClick={handleReplyClick}
        />
      </Card>

      {showReplyForm && (
        <Card className="w-full lg:w-[70%] mx-auto p-8 rounded-xl shadow-md mb-4">
          <CreatePost repliesTo={post._id}/>
        </Card>
      )}

      {!isEmptyHelper(responses) && (
        <Card className="w-full lg:w-[70%] mx-auto p-8 rounded-xl shadow-md mb-4">
          Réponse{responses.length > 1 ? "s" : ""} :
          <div className="ml-6 mt-4 border-l-2 border-gray-300 pl-4">
            {responses.map((response: Post) => (
              <PostComponent key={response._id} postData={response} />
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
  );
}
