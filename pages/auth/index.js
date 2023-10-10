import { useRouter } from "next/router";
import Auth from "../../components/Auth/Auth";

const Authentication = (props) => {
  const router = useRouter();
  const signupHandler = async (userData) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      router.reload();
    }
    const data = await response.json();
  };
  return (
    <div>
      <Auth onSignUp={signupHandler} />
    </div>
  );
};

export default Authentication;
