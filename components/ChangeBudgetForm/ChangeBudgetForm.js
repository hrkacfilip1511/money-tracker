import { useEffect, useRef, useState } from "react";
import useStore from "../../store/useStore";
import classes from "./ChangeBudgetForm.module.css";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import { signOut } from "next-auth/react";
const ChangeBudgetForm = ({ session }) => {
  const setSession = useStore((state) => state.setSession);
  const budgetRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setSession(session);
  }, []);

  const onChangeBudget = async (e) => {
    e.preventDefault();
    const enteredBudget = budgetRef.current.value;
    const data = {
      budget: enteredBudget,
      email: session?.user?.email,
    };
    setIsLoading(true);
    const response = await fetch("/api/change-budget", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setIsLoading(false);
    const dataJson = await response.json();

    if (response.status === 200) {
      setErrorMsg("");

      setResponseMsg(dataJson.message);
      let timeout = setTimeout(() => {
        signOut();
      }, 1500);
      return () => clearTimeout(timeout);
    } else {
      setResponseMsg("");
      setErrorMsg(dataJson.message);
    }
  };
  return (
    <div className={classes.budgetFormContainer}>
      <h3>Budget info</h3>
      <form onSubmit={onChangeBudget}>
        <div className={classes.budgetInput}>
          <label htmlFor="budget">Enter your new budget</label>
          <input
            id="budget"
            type="text"
            ref={budgetRef}
            placeholder={`Current budget is ${session?.user?.image}`}
          />
        </div>
        {responseMsg.length > 0 && (
          <span className={classes.resMsg}>{responseMsg}</span>
        )}
        {errorMsg.length > 0 && (
          <span className={classes.errorMsg}>{errorMsg}</span>
        )}
        <div className={classes.actions}>
          <button type="submit">Submit</button>
        </div>
      </form>
      {isLoading && (
        <div className={classes.spinner}>
          <LoadingSpinner width={30} height={30} />
        </div>
      )}
    </div>
  );
};

export default ChangeBudgetForm;
