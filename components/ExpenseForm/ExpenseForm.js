import Image from "next/image";
import classes from "./ExpenseForm.module.css";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStore from "../../store/useStore";
const ExpenseForm = () => {
  const [categories, setCategories] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();
  const session = useStore((state) => state.session);
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/categories");
      const data = await response.json();
      if (data?.length > 0) {
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);
  const titleRef = useRef();
  const dateRef = useRef();
  const amountRef = useRef();
  const quantityRef = useRef();
  const detailsRef = useRef();
  const showErrorMessage = (error) => {
    toast.error(error, {
      position: "top-center",
      autoClose: 3000,
    });
  };
  const showSuccessMsg = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
    });
    let timeout = setTimeout(() => {
      router.replace("/");
    }, 4800);
    return () => clearTimeout(timeout);
  };
  const submitExpenseHandler = async (e) => {
    e.preventDefault();

    const enteredTitle = titleRef.current.value;
    const selectedCategory = category;
    const date = dateRef.current.value;
    const enteredAmount = amountRef.current.value;
    const enteredQuantity = quantityRef.current.value;
    const enteredDetails = detailsRef.current.value;
    const enteredData = {
      email: session.user.email,
      title: enteredTitle,
      category: selectedCategory,
      date: new Date(date),
      amount: parseFloat(enteredAmount),
      quantity: parseInt(enteredQuantity),
      paymentMethod: paymentMethod,
      details: enteredDetails,
    };

    const response = await fetch("/api/add-expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enteredData),
    });
    if (response.status === 403) {
      const error = await response.json();
      showErrorMessage(error.message);
    }
    if (response.status === 201) {
      const success = await response.json();
      showSuccessMsg(success.message);
    }
  };

  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };
  return (
    <div>
      <ToastContainer />
      <form onSubmit={submitExpenseHandler}>
        <div className={classes.expenseFormContainer}>
          <h2>Add your expense</h2>
          <div className={classes.expenseSplitted}>
            <div className={classes.firstInfo}>
              <div className={classes.expenseTitle}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={titleRef} />
              </div>
              <div className={classes.expenseCategories}>
                <span>Select category</span>
                <select value={category} onChange={categoryHandler}>
                  <option value="">Select category</option>
                  {categories?.map((category) => {
                    return (
                      <option key={category._id}>
                        {category.categoryName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={classes.expenseDate}>
                <label htmlFor="date">Pick a date</label>
                <input type="date" id="date" ref={dateRef} />
              </div>
              <div className={classes.expenseNumbers}>
                <div className={classes.expenseAmount}>
                  <label htmlFor="amount">Amount</label>
                  <input type="text" id="amount" ref={amountRef} />
                </div>
                <div className={classes.expenseQuantity}>
                  <label htmlFor="quantity">Quantity</label>
                  <input type="number" id="quantity" ref={quantityRef} />
                </div>
              </div>

              <div className={classes.paymentMethod}>
                <span className={classes.paymentHeading}>Payment method</span>
                <div className={classes.methods}>
                  <div
                    className={`${classes.methodOne} ${
                      paymentMethod === "credit-card" ? classes.selected : ""
                    }`}
                    onClick={() => setPaymentMethod("credit-card")}
                  >
                    <Image
                      src={"/assets/icons/credit-card.png"}
                      alt="credit-card"
                      width={35}
                      height={35}
                    />
                    <span>Credit card</span>
                  </div>
                  <div
                    className={`${classes.methodTwo} ${
                      paymentMethod === "cash" ? classes.selected : ""
                    }`}
                    onClick={() => setPaymentMethod("cash")}
                  >
                    <Image
                      src={"/assets/icons/cash.png"}
                      alt="cash"
                      width={35}
                      height={35}
                    />
                    <span>Cash</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.secondInfo}>
              <div className={classes.expenseDescription}>
                <textarea
                  id="expenseDetails"
                  rows={15}
                  cols={50}
                  placeholder="Add expense details (optional)"
                  ref={detailsRef}
                />
              </div>
              <div className={classes.submitExpense}>
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
