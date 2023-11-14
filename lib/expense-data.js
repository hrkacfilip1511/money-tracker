export const fetchExpensesByEmail = async (email) => {
  let url = "";
  if (process.env.NODE_ENV === "development") {
    url = "http://localhost:3000/api/all-expenses";
  } else {
    url = "/api/all-expenses";
  }
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: email }),
  });
  let data;
  if (response.status === 200) {
    data = await response.json();
    return data.data?.expenses;
  } else {
    [];
  }
};
