import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns/esm";
import { db } from "../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import TodoItem from "./TodoItem";
import { updateTodoList } from "../slices/todoSlice";

function AppContent() {
  const dispatch = useDispatch();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "todo"));
    onSnapshot(q, (querySnapshot) => {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          firebaseId: doc.id,
          id: doc.data().id,
          status: doc.data().status,
          time: doc.data().time,
          title: doc.data().title,
        }))
      );
    });
  }, []);

  dispatch(updateTodoList(todos));
  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);
  const filterDate = useSelector((state) => state.todo.filterDate);
  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));
  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === "all") {
      return true;
    }
    return item.status === filterStatus;
  });

  const filteredDateTodoList = filteredTodoList.filter((item) => {
    if (filterDate === "filterDate") {
      return true;
    }
    return format(new Date(item.time), "MM/dd/yyyy")
      .toString()
      .startsWith(filterDate);
  });

  return (
    <div>
      {filteredDateTodoList && filteredDateTodoList.length > 0
        ? filteredDateTodoList.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        : "no todo found"}
    </div>
  );
}

export default AppContent;
