import { Friend } from "../api/Services";
import { useQuery } from "@tanstack/react-query";
import { useServices } from "../providers/ServicesProvider";

export default function Friends() {
  const { getUserFriends } = useServices();
  const { data: friendList } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const hasFriends = friendList && friendList.friends.length > 0;

  return (
    <div>
      <h3>Friends</h3>
      <div>Your ref link: {friendList?.ref_link}</div>
      {hasFriends ? (
        friendList.friends.map((friend, index) => (
          <FriendElement key={index} friend={friend} />
        ))
      ) : (
        <div>No Friends</div>
      )}
    </div>
  );
}

export function FriendElement({ friend }: { friend: Friend }) {
  return (
    <div>
      <div>Name: {friend.first_name}</div>
      <div>Name: {friend.last_name}</div>
      <div>Username: {friend.username}</div>
      <div>Balance: {friend.earned}</div>
    </div>
  );
}
