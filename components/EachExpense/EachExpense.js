import { useEffect, useState } from "react";
import classes from "./EachExpense.module.css";
import Image from "next/image";
import useStore from "../../store/useStore";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

const EachExpense = ({ expenseData }) => {
  const [categories, setCategories] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(
    expenseData?.paymentMethod
  );
  const session = useStore((state) => state.session);
  const [title, setTitle] = useState(expenseData?.title);
  const [amountVal, setAmountVal] = useState(expenseData?.amount);
  const [quantityVal, setQuantityVal] = useState(expenseData?.quantity);
  const [selectedCategory, setSelectedCategory] = useState(
    expenseData?.category
  );
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState();
  const [details, setDetails] = useState(expenseData?.details);
  const [error, setError] = useState("");
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
  const categoryHandler = (e) => {
    setSelectedCategory(e.target.value);
  };

  let imageName;
  if (categories.length > 0) {
    imageName = categories.find(
      (category) => category.categoryName === selectedCategory
    )?.categoryImage;
  }
  const editHandler = async () => {
    setError("");
    setIsLoading(true);
    const data = {
      email: session?.user?.email,
      expenseId: expenseData.expenseId,
      date: new Date(date),
      category: selectedCategory,
      paymentMethod: paymentMethod,
      title: title,
      amount: parseFloat(amountVal),
      quantity: parseInt(quantityVal),
      details: details,
    };
    const response = await fetch("/api/expense-modification", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setIsLoading(false);
    if (response.status === 201) {
      window.location.href = "/";
    } else {
      const data = await response.json();
      setError(data.message);
    }
  };
  const deleteExpense = async () => {
    setIsLoading(true);
    const response = await fetch(
      `/api/delete-expense/?email=${session?.user?.email}&expenseId=${expenseData?.expenseId}`,
      {
        method: "DELETE",
      }
    );
    setIsLoading(false);
    if (response.status === 201) {
      window.location.href = "/";
    }
  };
  const formattedDate = expenseData.date.split("T")[0];
  return (
    <div className={classes.itemContainer}>
      <div className={classes.icon}>
        <Image
          src={`/assets/categories/${imageName}`}
          width={50}
          height={50}
          alt={expenseData.category}
        />
      </div>
      <div className={classes.title}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={classes.numbers}>
        <div className={classes.amount}>
          <label htmlFor="amount">Amount (KM)</label>
          <input
            type="text"
            id="amount"
            value={amountVal}
            onChange={(e) => setAmountVal(e.target.value)}
          />
        </div>
        <div className={classes.quantity}>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantityVal}
            onChange={(e) => setQuantityVal(e.target.value)}
          />
        </div>
      </div>
      <div className={classes.options}>
        <div className={classes.categories}>
          <label>Select category</label>
          <select value={selectedCategory} onChange={categoryHandler}>
            {categories?.map((category) => {
              return (
                <option key={category._id}>{category.categoryName}</option>
              );
            })}
          </select>
        </div>
        <div className={classes.date}>
          <label htmlFor="date">Pick a date</label>
          <input
            type="date"
            id="date"
            value={date ? date : formattedDate}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>
      <div className={classes.paymentMethod}>
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
      <div className={classes.details}>
        <textarea
          value={details}
          rows={10}
          onChange={(e) => setDetails(e.target.value)}
        />
      </div>
      {isLoading || error.length > 0 ? (
        <div className={classes.spinner}>
          {isLoading ? (
            <LoadingSpinner width={30} height={30} lineWidth={3} />
          ) : (
            <span className={classes.errorMsg}>{error}</span>
          )}
        </div>
      ) : null}
      <div className={classes.actions}>
        <button className={classes.editBtn} onClick={editHandler}>
          Save changes
        </button>
        <button className={classes.deleteBtn} onClick={deleteExpense}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default EachExpense;
