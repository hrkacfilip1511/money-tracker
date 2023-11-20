import { useState } from "react";
import classes from "./Auth.module.css";
import { useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import useStore from "../../store/useStore";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
const Auth = (props) => {
  const [isLogin, setisLogin] = useState(true);
  const [isCheckedTerms, setIsCheckedTerms] = useState(false);
  const [errorCheckBoxClass, setErrorCheckBoxClass] = useState(false);
  const router = useRouter();
  const session = useStore((state) => state.session);
  const [isLoading, setIsLoading] = useState(false);
  if (session?.user?.email) {
    router.replace("/");
  }
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const budgetRef = useRef();
  const submitFormHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredName = !isLogin ? nameRef?.current?.value : "";
    const enteredBudget = !isLogin ? budgetRef.current.value : 0;

    if (isLogin) {
      setIsLoading(true);

      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });
      setIsLoading(false);

      if (result.status === 401) {
        setError(result.error);
      }
      if (result.status === 200) {
        router.replace("/");
        setError("");
      }
    } else {
      const usersData = {
        email: enteredEmail,
        password: enteredPassword,
        name: enteredName,
        budget: enteredBudget,
      };
      if (isCheckedTerms) {
        setErrorCheckBoxClass(false);
        props.onSignUp(usersData);
      } else {
        setErrorCheckBoxClass(true);
      }
    }
  };
  return (
    <div className={classes.authForm}>
      <form onSubmit={submitFormHandler}>
        <h1>{isLogin ? "Sign in" : "Sign up"}</h1>
        {!isLogin && (
          <div className={classes.name}>
            <label htmlFor="name">Insert your name</label>
            <input id="text" type="text" ref={nameRef} />
          </div>
        )}
        <div className={classes.email}>
          <label htmlFor="email">Insert email</label>
          <input id="email" type="text" ref={emailRef} />
        </div>
        <div className={classes.password}>
          <label htmlFor="password">Insert password</label>
          <input id="password" type="password" ref={passwordRef} />
        </div>
        {!isLogin && (
          <>
            <div className={classes.budget}>
              <label htmlFor="budget">Add your budget</label>
              <input type="text" ref={budgetRef} id="budget" />
            </div>
            <div className={classes.checkBox}>
              <input
                id="checkedBox"
                type="checkbox"
                checked={isCheckedTerms}
                onChange={() => setIsCheckedTerms((prev) => !prev)}
              />
              <label
                htmlFor="checkedBox"
                className={errorCheckBoxClass ? classes.errorMsg : null}
              >
                I accept all terms and conditions
              </label>
            </div>
          </>
        )}
        {props.errorMsg.length > 0 ? (
          <span className={classes.errorMsg}>{props.errorMsg}</span>
        ) : null}
        {error.length > 0 ? (
          <span className={classes.errorMsg}>{error}</span>
        ) : null}
        <div className={classes.actions}>
          <button className={classes.submitBtn}>
            {isLogin ? "Login" : "Sign up"}
          </button>
          <button
            className={classes.switchBtn}
            type="button"
            onClick={() => {
              setError("");
              setisLogin((prev) => !prev);
            }}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
          {isLoading || props.isLoading ? (
            <div style={{ marginTop: "10px" }}>
              <LoadingSpinner width={40} height={40} lineWidth={4} />{" "}
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default Auth;
