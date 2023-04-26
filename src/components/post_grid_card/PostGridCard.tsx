import React, { useState } from "react";
import S from "./PostGridCard.module.css";
import { SimplePost } from "@/model/post";
import Image from "next/image";
import ModalPortal from "../ui/ModalPortal";
import PostDetail from "../post_modal/PostDetail";
import PostModal from "../post_modal/PostModal";
import { signIn, useSession } from "next-auth/react";

interface Props {
  post: SimplePost;
  priority: boolean;
}
const PostGridCard = ({ post, priority = false }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const { image, username } = post;

  const { data: session } = useSession();

  const handleOpenPost = () => {
    if (!session?.user) {
      return signIn();
    }
    setOpenModal(true);
  };
  return (
    <div className={S.card}>
      <Image
        className={S.image}
        src={image}
        alt={`photo by ${username}`}
        fill
        sizes="650px"
        priority={priority}
        onClick={handleOpenPost}
      />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
};

export default PostGridCard;
