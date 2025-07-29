import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  where
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "./useAuth";

export const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  // Real-time listener
  useEffect(() => {
    if (!user) {
      setTasks([]);
      return;
    }

    const q = query(
      collection(db, "tasks"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(updatedTasks);
    });

    return () => unsubscribe();
  }, [user]);

  // Add new task
  const addTask = async (title) => {
    await addDoc(collection(db, "tasks"), {
      title,
      isCompleted: false,
      uid: user.uid,
      createdAt: new Date(),
    });
  };

  // Toggle complete status
  const toggleTask = async (task) => {
    const taskRef = doc(db, "tasks", task.id);
    await updateDoc(taskRef, {
      isCompleted: !task.isCompleted,
    });
  };

  // Delete task
  const deleteTask = async (task) => {
    const taskRef = doc(db, "tasks", task.id);
    await deleteDoc(taskRef);
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
  };
};
