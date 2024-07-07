import ShowAdButton from "../ShowAdButton/ShowAdButton";
import UserInfo from "../UserInfo/UserInfo";
import s from "./adGame.module.css";

export default function AdGame() {
  return (
    <div className={s.container}>
      <UserInfo />
      <ShowAdButton />
      {/* <Text as="div" align="center">
        Daily reward
        <Box>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </Box>
        <Button disabled={true}>Claim reward</Button>
      </Text> */}
    </div>
  );
}
