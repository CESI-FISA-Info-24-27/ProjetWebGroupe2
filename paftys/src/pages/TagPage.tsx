import PostComponent from "@/components/shared/PostComponent";
import type Post from "@/models/Post";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import isEmptyHelper from "@/utils/isEmptyHelper";
import LoadingComponent from "@/components/shared/LoadingComponent";
import { useEffect } from "react";
import { fetchPostsByTag } from "@/reducers/tagsSlice";
import { NavLink, useLocation } from "react-router-dom";
import RightSideBar from "@/components/shared/RightSideBarComponent";

// 👇️ importer Sonner
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";

export default function TagPage() {
  const location = useLocation();
  const tagId = location.pathname.split("/").pop();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPostsByTag({ postId: tagId || "" }));
  }, [dispatch, tagId]);

  const posts = useAppSelector((state) => state.tags.postsByTags);

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/tags/${tagId}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Lien vers #" + tagId + " copié !", {
        position: "bottom-center",
      });
    } catch (err) {
      console.error(err);
      toast.error("Échec de la copie");
    }
  };

  const parsedPosts = posts.map((post) => ({
    ...post,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
    date: post.date ? new Date(post.date) : new Date(),
  }));

  return (
    <>
      <Toaster richColors />

      <div className="flex flex-col md:flex-row h-screen w-full justify-between">
        <div className="flex flex-col items-center w-full md:w-[100%] h-full overflow-y-auto custom-scrollbar">
          <div className="text-purple-700 text-4xl border-b border-gray-700 w-full justify-center flex items-center p-4">
            <p
              className="cursor-pointer transition-transform duration-300 hover:translate-y-[-2px]"
              onClick={handleCopyLink}
            >
              #{tagId}
            </p>
          </div>

          {!isEmptyHelper(parsedPosts) &&
            parsedPosts.map((post: Post) => (
              <div
                className="mt-4 w-[95%] sm:w-[90%] lg:w-[70%]"
                key={post._id}
              >
                <PostComponent postData={post} />
              </div>
            ))}
          {isEmptyHelper(parsedPosts) && (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-gray-500 mt-4 text-2xl">
                Aucun post trouvé pour ce tag.
              </p>
              <NavLink to="/" className="text-blue-500 hover:underline mt-2">
                <Button className="cursor-pointer">
                  Retourner à l'accueil
                </Button>
              </NavLink>
            </div>
          )}
        </div>

        <RightSideBar />
      </div>
    </>
  );
}
