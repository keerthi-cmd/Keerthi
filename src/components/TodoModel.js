import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "../styles/modules/modal.module.scss";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo, deleteAllTodo } from "../slices/todoSlice";
import { v4 as uuid } from "uuid";
import { MdDelete } from "react-icons/md";

function TodoModel({
  type,
  modalOpen,
  setModalOpen,
  todo,
  deleteModal,
  setDeleteModal,
}) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("incomplete");
  const dispatch = useDispatch();
  useEffect(() => {
    if (type === "update" && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle("");
      setStatus("incomplete");
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Please enter a title");
      return;
    }

    if (title && status) {
      if (type === "add") {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success("todo added successfully");
      }
      if (type === "update") {
        if (todo.title !== title || todo.status !== status) {
          dispatch(
            updateTodo({
              ...todo,
              title,
              status,
            })
          );
        } else {
          toast.error("No changes");
        }
      }
      setModalOpen(false);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteAllTodo());
    setDeleteModal(false);
    toast.success("todos delete successfully");
  };
  return (
    <>
      {modalOpen && (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div
              className={styles.closeButton}
              onClick={() => setModalOpen(false)}
              onKeyDown={() => setModalOpen(false)}
              tab-index={0}
              role="button"
            >
              <MdOutlineClose />
            </div>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                {type === "update" ? "Update" : "Add"}Task
              </h1>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  placeholder="Enter Details Here"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="status">
                status
                <select
                  name="status"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="incomplete">Active</option>
                  <option value="complete">Complete</option>
                </select>
              </label>
              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {type === "update" ? "Update" : "Add"}Button
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setModalOpen(false)}
                  onKeyDown={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div
              className={styles.closeButton}
              onClick={() => setDeleteModal(false)}
              onKeyDown={() => setDeleteModal(false)}
              tab-index={0}
              role="button"
            >
              <MdOutlineClose />
            </div>
            <form className={styles.form} onSubmit={(e) => handleDelete(e)}>
              <h3>
                <MdDelete />
                Are you sure you want to delete all the items?
              </h3>
              <div className={styles.buttonContainer}>
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => setDeleteModal(false)}
                >
                  CANCEL
                </Button>
                <Button type="submit" variant="danger">
                  DELETE
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default TodoModel;
