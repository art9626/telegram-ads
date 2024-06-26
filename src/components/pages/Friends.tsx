import {useEffect, useState} from "react";
import {Friend, getUserFriends, UserFriends} from "../../lib/fetch.ts";
import {useInitData} from "@tma.js/sdk-react";

export default function Friends() {
  const initData = useInitData();
  const token = localStorage.getItem("token");

  const [friendList, setFriends] = useState<UserFriends|null>(null);

  useEffect(() => {
    getUserFriends(token, initData).then(res => setFriends(res))
  }, []);

  const anyFriends = friendList && friendList.friends.length > 0

  return(
    <div>
      <h3>Friends</h3>
      <div>Your ref link: {friendList?.ref_link}</div>
      <div>{ anyFriends ?
        (friendList.friends.map((friend, index) => (
          <FriendElement key={index} friend={friend}/>
        ))) : (<div>No Friends</div>)}</div>
    </div>
  )
}

export function FriendElement({friend}: {friend: Friend}) {
  return(
    <div>
      <div>Name: {friend.first_name}</div>
      <div>Name: {friend.last_name}</div>
      <div>Username: {friend.username}</div>
      <div>Balance: {friend.earned}</div>
    </div>

  )
}
