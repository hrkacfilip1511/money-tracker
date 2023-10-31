import Image from "next/image";
import classes from "./EmptyData.module.css";
const EmptyData = ({ imageName, message }) => {
  return (
    <div className={classes.emptyDataContainer}>
      <div>
        <Image
          src={`/assets/bg/${imageName}.png`}
          width={100}
          height={100}
          alt={imageName}
        />
      </div>
      <p className={classes.message}>{message}</p>
    </div>
  );
};
export default EmptyData;
