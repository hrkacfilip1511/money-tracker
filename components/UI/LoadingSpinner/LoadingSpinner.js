import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = ({ width, height }) => {
  return (
    <div
      className={classes.loaderItem}
      style={{ width: `${width}px`, height: `${height}px` }}
    ></div>
  );
};

export default LoadingSpinner;
