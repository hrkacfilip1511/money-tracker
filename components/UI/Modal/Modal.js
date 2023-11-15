import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.modalContent}>
        <div className={classes.close} onClick={props.clicked}>
          <span className={classes.closetxt}>&times;</span>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
