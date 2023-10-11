import Image from "next/image";
import classes from "./PaymentCategories.module.css";

const Payments = ({ expenses }) => {
  const expensesByCash = expenses?.filter(
    (expense) => expense.paymentMethod === "cash"
  );
  const expensesByCreditCard = expenses?.filter(
    (expense) => expense.paymentMethod === "credit-card"
  );
  const cashExpenseByPct = (expensesByCash.length / expenses.length) * 100;
  const parsedcashExpenseByPct = parseInt(cashExpenseByPct);
  return (
    <div className={classes.paymentCategoriesContainer}>
      <div className={classes.paymentDetails}>
        <h3>Payment methods</h3>
        <div className={classes.paymentMethods}>
          <div className={classes.creditCard}>
            <Image
              src={"/assets/icons/credit-card_v2.png"}
              alt="credit-card"
              width={90}
              height={90}
            />
            <span>{expensesByCreditCard.length}</span>
          </div>
          <div className={classes.cash}>
            <Image
              src={"/assets/icons/cash_v2.png"}
              alt="credit-card"
              width={90}
              height={90}
            />
            <span>{expensesByCash.length}</span>
          </div>
        </div>
        {expenses.length > 0 && (
          <div className={classes.paymentDiagram}>
            <div
              className={classes.paymentPie}
              style={{
                background: `linear-gradient(to right, rgb(13, 67, 214) ${parsedcashExpenseByPct}%, rgb(255, 76, 32) ${
                  100 - parsedcashExpenseByPct
                }%)`,
              }}
            >
              <div className={classes.sliceCard}></div>
              <div className={classes.sliceCash}></div>
            </div>
            <div className={classes.legend}>
              <div className={classes.legendCash}>
                <span className={classes.legendCashBg}></span>
                <span>Cash</span>
              </div>
              <div className={classes.legendCredit}>
                <span className={classes.legendCreditBg}></span>
                <span>Credit card</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
