import GridSpinner from "../GridSpinner";
import PostGridCard from "../post_grid_card/PostGridCard";
import S from "./PostGrid.module.css";
import usePosts from "@/hooks/usePosts";

const PostGrid = () => {
  const { posts, isLoading } = usePosts();

  return (
    <div className={`${S.wrap} ${isLoading && S.loading}`}>
      {isLoading ? (
        <GridSpinner />
      ) : posts?.length ? (
        <ul className={S.post_list}>
          {posts.map((post, index) => (
            <li key={post.id} className={S.post_card}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
        </ul>
      ) : (
        <p>게시물이 없습니다.</p>
      )}
    </div>
  );
};

export default PostGrid;
