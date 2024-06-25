import {useEffect, useState} from "react";
import {getUserFriends, UserFriends} from "../../lib/fetch.ts";
import {useInitData} from "@tma.js/sdk-react";

export default function Friends() {
  const initData = useInitData();
  const token = localStorage.getItem("token");

  const [friends, setFriends] = useState<UserFriends|[]>([]);

  useEffect(() => {
    getUserFriends(token, initData).then(res => setFriends(res))
    console.log(friends)
  }, []);

  return(
    <div>Friends</div>
  )
}
