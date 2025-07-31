import {
  collection,
  addDoc,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Global variable to store tasks and unsubscribe function
let tasks = []; //Similar to useState but without React's reactivity (works outside components)
let unsubscribeTasks = null; //Similar to useEffect listener needs to be created (like when user changes)

//Initializes real-time tasks listener for a specific user
export const initTasks = (uid, callback) => {
  
  if (unsubscribeTasks) {
    unsubscribeTasks(); // Clean up previous subscription if exists only if it had anything inside it
  }

  // Create query for user's tasks, ordered by creation date also It include the UID and description the query is the thing which is use to create a collection in a firebase base
  const q = query(
    collection(db, "tasks"),
    where("uid", "==", uid),
    orderBy("createdAt", "desc")
  );

  // Set up real-time subscription
  unsubscribeTasks = onSnapshot(q, (snapshot) => {
    tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(tasks);
  });

  // Return cleanup function
  return () => {
    if (unsubscribeTasks) {
      unsubscribeTasks();
      unsubscribeTasks = null;
    }
  };
};

//Gets current tasks array from the firebase side like before mistake I did add a params like fool

export const getTasks = () => tasks;

// Adds a new task to Firestore

export const addTask = async (title, uid) => {
  if (!title.trim()) throw new Error("Task title cannot be empty");

  try {
    await addDoc(collection(db, "tasks"), {
      title,
      isCompleted: false,
      uid,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

//Toggles task completion status

export const toggleTask = async (taskId, currentStatus) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, {
      isCompleted: !currentStatus,
    });
  } catch (error) {
    console.error("Error toggling task:", error);
    throw error;
  }
};

// Deletes a task from Firestore

export const deleteTask = async (taskId) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
