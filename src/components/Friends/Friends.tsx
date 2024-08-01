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
    <div>
      <h1>Friends</h1>
      {friendList?.ref_link && <InviteLink url={friendList.ref_link} />}
      <div>Earned: {friendList?.earned_by_refs || 0}</div>
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
      <div>Username: {friend.username}</div>
    </div>
  );
}

function InviteLink({ url }: { url: string }) {
  const hf = useHapticFeedback();

  const touchStartHandler = () => hf.impactOccurred("medium");

  const shareHandler = () => {
    window.open(
      `https://t.me/share/url?url=${url}&text=${"Заходи в приложение"}`
    );
  };

  const copyHandler = async () => {
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
        <Button onClick={shareHandler} onTouchStart={touchStartHandler}>
          Share
        </Button>
        <Button onClick={copyHandler} onTouchStart={touchStartHandler}>
          Copy
        </Button>
      </div>
    </div>
  );
}
