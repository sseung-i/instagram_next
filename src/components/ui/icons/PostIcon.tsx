import { MdGridOn } from "react-icons/md";

interface Props {
  color?: string;
  size?: number;
}
const PostIcon = ({ color, size }: Props) => {
  return <MdGridOn color={color || "black"} size={size || 34} />;
};

export default PostIcon;
