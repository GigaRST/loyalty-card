import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../firebase/firebaseConfig";
import { useUserStore } from "../store/useUserStore";

interface LoginCredentials {
  email: string;
  password: string;
}

const useLogin = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: async ({ email, password }: LoginCredentials) => {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        throw new Error("Utente non trovato nel database");
      }

      const userData = userDoc.data();
      setUser({
        id: user.uid,
        username: userData.username,
        email: user.email!,
        role: userData.role,
        points: userData.points,
      });
      return userData;
    },
    onError: (error: Error) => {
      console.error("Login Error:", error.message);
      toast.error(error.message);
    },
    onSuccess: (userData) => {
      toast.success("Benvenuto!");
      navigate(userData.role === "admin" ? "/admin" : "/");
    },
  });
};

export default useLogin;
