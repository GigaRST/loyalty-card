import { useMutation } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserStore } from "../store/useUserStore";

const useLogout = () => {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);

  return useMutation({
    mutationFn: async () => {
      await signOut(auth);
    },
    onError: (error: Error) => {
      console.error("Logout Error:", error.message);
      toast.error("Errore durante il logout");
    },
    onSuccess: () => {
      logout();
      toast.success("Logout effettuato con successo!");
      navigate("/login");
    },
  });
};

export default useLogout;
