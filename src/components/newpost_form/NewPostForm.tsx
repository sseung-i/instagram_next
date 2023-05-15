"use client";

import React, {
  ChangeEvent,
  FormEvent,
  DragEvent,
  useState,
  useRef,
} from "react";
import S from "./NewPostForm.module.css";
import Image from "next/image";
import { AuthUser } from "@/model/user";
import PostUserAvatar from "../ui/PostUserAvatar";
import FilesIcon from "../ui/icons/FilesIcon";
import { useRouter } from "next/navigation";
import GridSpinner from "../GridSpinner";

interface Props {
  user: AuthUser;
}

const NewPostForm = ({ user: { image, username } }: Props) => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<null | File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return alert("이미지를 추가해주세요");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", textRef.current?.value ?? "");

    fetch("/api/posts/", { method: "POST", body: formData })
      .then((res) => {
        if (!res.ok) {
          setError(`[${res.status}] ${res.statusText}`);
          return;
        }

        router.push("/");
      })
      .catch((err) => {
        setInterval(() => setError(err.toString()), 3000);
      })
      .finally(() => setLoading(false));
  };

  const handleDrag = (e: DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;

    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  return (
    <section className={S.wrap}>
      {loading && (
        <div className={S.loading}>
          <GridSpinner />
        </div>
      )}
      {error && <p className={S.error}>{error}</p>}
      <PostUserAvatar image={image ?? ""} userName={username} />
      <form className={S.form} onSubmit={handleSubmit}>
        <label
          htmlFor="input-upload"
          className={file ? S.hasfile : ""}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && <div className={S.dragging} />}
          {!file && (
            <div className={S.icon_wrap}>
              <FilesIcon />
              <p>Drag and Drop your image here or click</p>
            </div>
          )}
          {file && (
            <div className={S.local_img_wrap}>
              <Image
                className={S.local_img}
                src={URL.createObjectURL(file)}
                alt="local file"
                fill
                sizes="650px"
              />
            </div>
          )}
        </label>
        <input
          name="input"
          id="input-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <textarea
          placeholder="Write a caption..."
          required
          minLength={10}
          rows={10}
          ref={textRef}
        />
        <button>Publish</button>
      </form>
    </section>
  );
};

export default NewPostForm;
