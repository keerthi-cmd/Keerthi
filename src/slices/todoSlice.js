import { createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

const initialValue = {
  filterDate: "filterDate",
  filterStatus: "all",
  todoList: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      sendRequest(action.payload);
    },
    deleteTodo: (state, action) => {
      console.log(action.payload);
      console.log(state.todoList);
      deleteRequest(action.payload);
    },

    deleteAllTodo: (state) => {
      var todoList = state.todoList;
      todoList.forEach((todo) => {
        state.todoList = [];
        deleteRequest(todo.firebaseId);
      });
    },

    updateTodo: (state, action) => {
      console.log(action.payload);
      updateRequest(action.payload);
    },

    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },

    updateFilterDate: (state, action) => {
      state.filterDate = action.payload;
    },
    updateTodoList: (state, action) => {
      state.todoList = action.payload;
    },
  },
});
const updateRequest = async (todo) => {
  const taskDocRef = doc(db, "todo", todo.firebaseId);
  try {
    updateDoc(taskDocRef, {
      status: todo.status,
      title: todo.title,
    });
  } catch (err) {
    alert(err);
  }
};
const deleteRequest = async (id) => {
  const taskDocRef = doc(db, "todo", id);
  try {
    await deleteDoc(taskDocRef);
  } catch (err) {
    alert(err);
  }
};
const sendRequest = async (todoList) => {
  try {
    await addDoc(collection(db, "todo"), {
      id: todoList.id,
      status: todoList.status,
      time: todoList.time,
      title: todoList.title,
    });
  } catch (err) {
    alert(err);
  }
};

export const {
  addTodo,
  deleteTodo,
  updateTodo,
  updateFilterStatus,
  updateFilterDate,
  updateTodoList,
  deleteAllTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
