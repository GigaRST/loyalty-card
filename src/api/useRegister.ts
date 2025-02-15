import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

interface RegisterCredentials {
  email: string;
  password: string;
  username: string;
}

const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ email, password, username }: RegisterCredentials) => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username,
        email,
        role: "user",
        points: 0,
        createdAt: serverTimestamp(),
      });
      return user;
    },
    onError: (error: Error) => {
      console.error("Registration Error:", error.message);
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Registrazione completata con successo!");
      navigate("/");
    },
  });
};

export default useRegister;
