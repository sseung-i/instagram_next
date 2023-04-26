"use client";

import { FormEvent, useEffect, useState } from "react";
import SearchList from "./SearchList";
import useSWR from "swr";
import { SearchUser } from "@/model/user";
import { FadeLoader } from "react-spinners";
import S from "./Search.module.css";
import useDebounce from "@/hooks/useDebounce";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const deboundedValue = useDebounce(keyword);

  const {
    data,
    isLoading: loading,
    error,
  } = useSWR<SearchUser[]>(`/api/search/${deboundedValue}`);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <form className={S.search} onSubmit={onSubmit}>
        <input
          className={S.searchInput}
          autoFocus
          placeholder="Search for a username or name"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        {loading ? (
          <div className={S.loading_wrap}>
            <FadeLoader color="gray" />
          </div>
        ) : data && data.length > 0 ? (
          <SearchList userList={data} />
        ) : (
          "검색결과가 없습니다"
        )}
      </form>
      {error && <p>무언가가 잘못 되었음😱</p>}
    </>
  );
};

export default Search;
