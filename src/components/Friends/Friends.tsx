import { useQuery } from "@tanstack/react-query";
import { useHapticFeedback } from "@tma.js/sdk-react";
import { Friend } from "../../api/Services";
import { useServices } from "../../providers/ServicesProvider";
import Button from "../ui/Button/Button";
import { toast } from "react-toastify";
import { fallbackCopyTextToClipboard } from "../../utils/fallbackCopyTextToClipboard";
import s from "./friends.module.css";

export default function Friends() {
  const { getUserFriends } = useServices();
  const { data: friendList } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const hasFriends = friendList && friendList.friends.length > 0;

  return (
    <div className={s.container}>
      <div>
        <h1 style={{margin: 0}}>Friends</h1>
        <div>Invite more friends and increase your income!</div>
        {friendList?.ref_link && <InviteLink url={friendList.ref_link}/>}
      </div>
      <h2>Earned: {friendList?.earned_by_refs || 0}</h2>
      <div>
        <h3>Your friends</h3>
        <div className={s.friendsList}>
          {hasFriends ? (
            friendList.friends.map((friend, index) => (
              <FriendElement key={index} friend={friend}/>
            ))
          ) : (
            <div>No Friends</div>
          )}
        </div>
      </div>
    </div>
  );
}

export function FriendElement({friend}: { friend: Friend }) {
  return (
    <div>Username: {friend.username}</div>
  );
}

const inviteText = "🎮💰 Hey! Want to earn crypto while gaming? Join me on AdVenture!\n " +
  "\n" +
  "Watch ads, play fun games, get paid in real crypto. Use my link for a 1000 coin bonus!\n " +
  "\n" +
  "Let's get rich gaming together! 🚀"

function InviteLink({url}: { url: string }) {
  const hf = useHapticFeedback();

  const shareHandler = () => {
    hf.impactOccurred("medium");
    window.open(
      `https://t.me/share/url?url=${url}&text=${inviteText}`
    );
  };

  const copyHandler = async () => {
    hf.impactOccurred("medium");
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
    } else {
      fallbackCopyTextToClipboard(url);
    }
    toast("Link copied!");
  };

  return (
    <div className={s.linkContainer}>
      <h3 className={s.linkHeader}>Invite link</h3>
      <span className={s.link}>{url}</span>
      <div className={s.buttons}>
        <Button onClick={shareHandler}>Share</Button>
        <Button onClick={copyHandler}>Copy</Button>
      </div>
    </div>
  );
}
