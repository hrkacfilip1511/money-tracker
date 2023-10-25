import { useRef } from "react";
import useStore from "../../store/useStore";
import classes from "./ChangeBudgetForm.module.css";
const ChangeBudgetForm = () => {
  const session = useStore((state) => state.session);
  const budgetRef = useRef("");
  const onChangeBudget = async (e) => {
    e.preventDefault();
    const enteredBudget = budgetRef.current.value;
    const data = {
      budget: enteredBudget,
      email: session?.user?.email,
    };
    const response = await fetch("/api/change-budget", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      window.location.href = "/";
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
        <div className={classes.actions}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ChangeBudgetForm;
