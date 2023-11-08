import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../styles/modules/todoItem.module.scss";
import { getClass } from "../util/getClasses";
import { format } from "date-fns";
import { MdDelete, MdEdit } from "react-icons/md";
import TodoModal from "./TodoModal";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../features/todo/todoSlice";
import { toast } from "react-toastify";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    todo.status === "complete" ? setChecked(true) : setChecked(false);
  }, [todo.status]);

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({ ...todo, status: checked ? "incomplete" : "complete" })
    );
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Todo Deleted Successfully");
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  return (
    <>
      <motion.div className={styles.item}>
        <div className={styles.todoDetails}>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => handleCheck()}
            style={{
              accentColor: "var(--primaryPurple)",
            }}
            tabIndex={-1}
          />
          <div className={styles.texts}>
            <p
              className={getClass([
                styles.todoText,
                todo.status === "complete" && styles["todoText--completed"],
              ])}
            >
              {todo.title}
            </p>
            <p className={styles.time}>
              {format(new Date(todo.time), "p, MM/dd/yyyy")}
            </p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            role="button"
            tabIndex={0}
            onClick={() => handleDelete()}
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={() => handleUpdate()}
            role="button"
            tabIndex={0}
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <TodoModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        todo={todo}
      />
    </>
  );
};

export default TodoItem;
