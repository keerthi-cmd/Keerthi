import { updateTodoList } from "../slices/todoSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { collection, query, getDocs } from "firebase/firestore";
//Redux Thunk logic
//TODO ITEM IN FUTURE:
export const fetchTodoData = createAsyncThunk(
  async (dispatch) => {
    const fetchData = async () => {
      const loadedTodos = [];
      const todosCollection = collection(db, "todo");
      const todosQuery = query(todosCollection);
      const querySnapshot = await getDocs(todosQuery);

      querySnapshot.forEach((doc) =>
        loadedTodos.push({
          firebaseId: doc.id,
          id: doc.data().id,
          status: doc.data().status,
          time: doc.data().time,
          title: doc.data().title,
        })
      );

      return loadedTodos;
    };
    const response = await fetchData();
    dispatch(updateTodoList(response));
  }
  //  return response;
);
