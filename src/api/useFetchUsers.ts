import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

interface User {
  id: string;
  username: string;
  points: number;
}

const fetchUsers = async (): Promise<User[]> => {
  const q = query(collection(db, "users"), where("role", "!=", "admin"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as User)
  );
};

export const useFetchUsers = () => {
  return useQuery<User[]>({ queryKey: ["users"], queryFn: fetchUsers });
};
