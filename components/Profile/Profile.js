import { useState } from "react";
import classes from "./Profile.module.css";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import { signOut } from "next-auth/react";
const Profile = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const changePasswordHandler = async () => {
    setIsLoading(true);
    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
      email: props.session.user.email,
    };
    const response = await fetch("/api/edit-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataJson = await response.json();
    setIsLoading(false);
    if (response.status >= 400) {
      setError(dataJson.message);
    } else {
      setError("");
      await signOut();
    }
  };

  return (
    <div className={classes.profileContainer}>
      <div className={classes.email}>
        <label htmlFor="email">Your email</label>
        <input
          type="text"
          id="email"
          value={props.session.user.email}
          disabled={true}
        />
      </div>
      <div className={classes.name}>
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          id="name"
          value={props.session.user.name}
          disabled={true}
        />
      </div>
      <div className={classes.oldPassword}>
        <label htmlFor="oldPass">Enter old password</label>
        <input
          type="password"
          id="oldPass"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div className={classes.newPassword}>
        <label htmlFor="newPass">Enter new password</label>
        <input
          type="password"
          id="newPass"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className={classes.confirmPassword}>
        <label htmlFor="confPass">Confirm new password</label>
        <input
          type="password"
          id="confPass"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {isLoading || error.length > 0 ? (
        <div className={classes.spinner}>
          {isLoading ? (
            <LoadingSpinner width={30} height={30} lineWidth={3} />
          ) : (
            <p className={classes.error}>{error}</p>
          )}
        </div>
      ) : null}
      <div className={classes.action}>
        <button onClick={changePasswordHandler}>Submit</button>
      </div>
    </div>
  );
};

export default Profile;
