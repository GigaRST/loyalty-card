import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";

const updateUserPoints = async ({
  id,
  amount,
}: {
  id: string;
  amount: number;
}) => {
  const userRef = doc(db, "users", id);
  await updateDoc(userRef, { points: amount });
};

export const useUpdatePoints = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserPoints,
    onSuccess: () => {
      toast.success("Punti aggiornati con successo!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: Error) => {
      toast.error("Errore nell'aggiornamento dei punti: " + error.message);
      console.error("Errore nell'aggiornamento dei punti:", error);
    },
  });
};
