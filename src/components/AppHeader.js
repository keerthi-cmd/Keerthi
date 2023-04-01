import React, { useState } from "react";
import Button from "./Button";
import SelectButton from "./SelectButton";
import styles from "../styles/modules/app.module.scss";
import TodoModel from "./TodoModel";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterStatus, updateFilterDate } from "../slices/todoSlice";
import { format } from "date-fns/esm";
import { MdDelete } from "react-icons/md";

function AppHeader() {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const filterStatus = useSelector((state) => state.todo.filterStatus);
  const todosList = useSelector((state) => state.todo.todoList);
  const filterDateStatus = useSelector((state) => state.todo.filterDate);
  const sortedTodoList = [...todosList];

  let uniqueDates = [];
  sortedTodoList.forEach((todo) => {
    let date = format(new Date(todo.time), "MM/dd/yyyy");
    if (!uniqueDates.includes(date)) {
      uniqueDates.push(date);
    }
  });

  const updateFilter = (e) => {
    dispatch(updateFilterStatus(e.target.value));
  };
  const updateDateFilter = (e) => {
    if (e.target !== null || e.target !== undefined) {
      dispatch(updateFilterDate(e.target.value));
    }
  };
  return (
    <div className={styles.appHeader}>
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        ADD
      </Button>
      <Button variant="danger" onClick={() => setDeleteModal(true)}>
        <MdDelete /> <span>DELETE ALL</span>
      </Button>

      <SelectButton id="status" value={filterStatus} onChange={updateFilter}>
        <option value="all">ALL</option>
        <option value="incomplete">Active</option>
        <option value="complete">Complete</option>
      </SelectButton>
      <SelectButton
        id="date"
        value={filterDateStatus}
        onChange={updateDateFilter}
      >
        <option value="filterDate">Filter By Date</option>
        {uniqueDates.map((date, index) => (
          <option key={index} value={date}>
            {date}
          </option>
        ))}
      </SelectButton>

      <TodoModel
        type="add"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
      />
    </div>
  );
}

export default AppHeader;
