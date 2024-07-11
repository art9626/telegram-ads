import { FadeLoader } from "react-spinners";
import s from "./loader.module.css";

export default function Loader() {
  return (
    <div className={s.container}>
      <FadeLoader color="#fff" />
    </div>
  );
}
