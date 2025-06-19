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

  const parsedPosts = postData.map((post) => ({
    ...post,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
    date: post.date ? new Date(post.date) : new Date(),
  }));

  const post = parsedPosts[0];
  const responses = parsedPosts.slice(1); 

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
    <div className="flex flex-col p-4 h-screen w-full">
      <Card className="w-full lg:w-[70%] mx-auto p-8 items-center rounded-xl shadow-md mb-4">
        <PostComponent {...post}/>
      </Card>
      
      {!isEmptyHelper(responses) && (
        <Card className="w-full lg:w-[70%] mx-auto p-8 items-center rounded-xl shadow-md mb-4">
          Réponse{responses.length > 1 ? "s" : ""} :
          {responses.map((post: Post) => (
            <PostComponent key={post._id} {...post} />
          ))}
        </Card>
      )}
      
      {isEmptyHelper(responses) && (!showNoResponseMessage ? (
        <LoadingComponent message={"Chargement des réponses..."} />
      ) : (
        <Card className="w-full lg:w-[70%] mx-auto p-8 items-center rounded-xl shadow-md mb-4">
          Aucune réponse pour le moment.
        </Card>
      ))}
    </div>
  );
}