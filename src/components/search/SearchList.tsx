import { SearchUser } from "@/model/user";
import S from "./SearchList.module.css";
import UserCard from "./UserCard";

interface Props {
  userList: SearchUser[];
}
const SearchList = ({ userList }: Props) => {
  return (
    <ul className={S.user_list}>
      {userList.map((user) => {
        return (
          <li key={user.id} className={S.user}>
            <UserCard user={user} />
          </li>
        );
      })}
    </ul>
  );
};

export default SearchList;
