import Image from "next/image";
import classes from "./ComingSoon.module.css";
import useStore from "../../../store/useStore";

const ComingSoon = () => {
  const isMobile = useStore((state) => state.isMobile);
  return (
    <div className={classes.contentContainer}>
      <div className={classes.contentImage}>
        <Image
          src={"/assets/bg/builders.png"}
          alt="builders"
          width={isMobile ? 200 : 360}
          height={isMobile ? 260 : 460}
        />
      </div>
      <div className={classes.contentTitle}>
        <span className={classes.firstPartTitle}>
          COMING S<span className={classes.secondPartTitle}>O</span>
          <span className={classes.thirdPartTitle}>ON</span>
        </span>
      </div>
      <div className={classes.loaderContainer}>
        <div className={classes.loader}>
          <span>74%</span>
        </div>
        <div className={classes.animate}></div>
      </div>
    </div>
  );
};
export default ComingSoon;
