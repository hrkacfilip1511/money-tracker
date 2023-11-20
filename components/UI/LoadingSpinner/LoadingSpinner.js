import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = ({ width, height, lineWidth }) => {
  return (
    <div
      className={classes.loaderItem}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        border: `${lineWidth}px solid rgb(200, 204, 204)`,
        borderTop: `${lineWidth}px solid rgb(64, 64, 250)`,
      }}
    ></div>
  );
};

export default LoadingSpinner;
