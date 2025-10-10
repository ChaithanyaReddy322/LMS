import { createContext, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import toast from "react-hot-toast"; // Import toast

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });
  const [loading, setLoading] = useState(true);

  async function handleRegisterUser(event) {
    event.preventDefault();
    const loadingToastId = toast.loading("Creating account...");

    try {
      const data = await registerService(signUpFormData);

      if (data.success) {
        toast.dismiss(loadingToastId);
        toast.success("Account created! Please sign in.");
        // Consider resetting the form or switching the tab for the user
      } else {
        toast.dismiss(loadingToastId);
        toast.error(data.message || "An unknown error occurred during registration.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.dismiss(loadingToastId);
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    }
  }

  async function handleLoginUser(event) {
    event.preventDefault();
    const loadingToastId = toast.loading("Signing in...");

    try {
      const data = await loginService(signInFormData);

      if (data.success) {
        toast.dismiss(loadingToastId);
        toast.success("Successfully logged in!");

        sessionStorage.setItem(
          "accessToken",
          JSON.stringify(data.data.accessToken)
        );
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
      } else {
        toast.dismiss(loadingToastId);
        toast.error(data.message || "An unknown error occurred during login.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.dismiss(loadingToastId);
      toast.error(error.response?.data?.message || "Invalid email or password.");
    }
  }

  async function checkAuthUser() {
    try {
      const data = await checkAuthService();
      if (data.success) {
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
      }
    } catch (error) {
      console.log(error);
      setAuth({
        authenticate: false,
        user: null,
      });
    } finally {
      setLoading(false);
    }
  }

  function resetCredentials() {
    setAuth({
      authenticate: false,
      user: null,
    });
    sessionStorage.removeItem("accessToken");
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
        resetCredentials,
      }}
    >
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
}