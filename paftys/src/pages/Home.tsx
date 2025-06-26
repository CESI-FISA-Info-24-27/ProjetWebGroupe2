import PostComponent from "@/components/shared/PostComponent";
import { fetchPosts } from "@/reducers/postSlice";
import type Post from "@/models/Post";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import isEmptyHelper from "@/utils/isEmptyHelper";
import LoadingComponent from "@/components/shared/LoadingComponent";
import RightSideBar from "@/components/shared/RightSideBarComponent";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CreatePost from "@/components/shared/CreatePost";

export default function HomeComponent() {
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const authUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPosts({ page }));
  }, [page]);

  useEffect(() => {
    const getNumberOfPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DB_URI}/api/posts/number`
        );
        console.log(response);

        if (response.data) {
          setTotalPosts(response.data.data.count);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du nombre de posts :",
          error
        );
      }
    };
    getNumberOfPosts();
  }, []);

  const posts = useAppSelector((state) => state.post.posts);

  const parsedPosts = posts.map((post) => ({
    ...post,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
    date: post.date ? new Date(post.date) : new Date(),
  }));

  return (
    <div className="flex flex-col md:flex-row h-screen w-full justify-between md:pb-0">
      <div className="flex flex-col items-center w-full md:w-[70%] h-full overflow-y-auto custom-scrollbar">
        {!isEmptyHelper(authUser) && authUser?.state !== "suspended" && (
          <CreatePost onPostCreated={() => dispatch(fetchPosts({ page }))} />
        )}
        {!isEmptyHelper(parsedPosts) &&
          parsedPosts.map((post: Post) => (
            <div className="mt-4 w-[95%] sm:w-[90%] lg:w-[70%]" key={post._id}>
              <PostComponent postData={post} />
            </div>
          ))}
        {isEmptyHelper(parsedPosts) &&
          (page === 1 ? (
            <LoadingComponent message={"Chargement des posts..."} />
          ) : (
            <p>Vous avez atteint la fin des posts.</p>
          ))}
        <div className="flex mb-5 justify-center mt-4 gap-3">
          {page > 1 && (
            <Button
              className="cursor-pointer"
              onClick={() => {
                setPage((prev) => Math.max(1, prev - 1));
                const container = document.querySelector(".custom-scrollbar");
                if (container) {
                  container.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              Page précédente
            </Button>
          )}
          {!isEmptyHelper(posts) && totalPosts / 15 > page && (
            <Button
              className="cursor-pointer"
              onClick={() => {
                setPage((prev) => prev + 1);
                const container = document.querySelector(".custom-scrollbar");
                if (container) {
                  container.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              Page suivante
            </Button>
          )}
        </div>
      </div>
      <RightSideBar />
    </div>
  );
}
