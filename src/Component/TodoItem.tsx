import React, { useState } from "react";
import { Stack, TextField, Checkbox, Button, Typography } from "@mui/material";
type PropsType = {
  todo: TodoItemType;
  handleDeleteTodo: (id: TodoItemType["id"]) => void;
  handleEditTodo: (val: string, id: TodoItemType["id"]) => void;
  handleCompletedTodo: (id: TodoItemType["id"]) => void;
};
const TodoItem = ({
  todo,
  handleCompletedTodo,
  handleDeleteTodo,
  handleEditTodo,
}: PropsType) => {
  const [editActive, setEditActive] = useState<boolean>(false);
  const [val, setVal] = useState<string>(todo.title);
  console.log({ val });
  return (
    <Stack direction={"row"} alignItems="center" sx={{ padding: "1rem" }}>
      {editActive ? (
        <TextField
          sx={{ fontWeight: "600", margin: "1rem 1rem" }}
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
      ) : (
        <Typography variant={"h4"} marginRight={"auto"}>
          {todo?.title}
        </Typography>
      )}{" "}
      <Checkbox
        checked={todo.isCompleted}
        onChange={() => handleCompletedTodo(todo.id)}
      />
      <Button
        sx={{ fontWeight: "600", margin: "1rem 1rem" }}
        variant="contained"
        onClick={() => setEditActive((prev) => !prev)}
      >
        Edit
      </Button>
      {editActive ? (
        <Button
          sx={{ fontWeight: "600", margin: "1rem 1rem" }}
          variant="contained"
          onClick={() => {
            if (val !== "") {
              handleEditTodo(val, todo.id);
              setEditActive(false);
            }
          }}
        >
          Save
        </Button>
      ) : (
        <Button
          sx={{ fontWeight: "600", margin: "1rem 1rem" }}
          variant="contained"
          onClick={() => handleDeleteTodo(todo.id)}
        >
          Delete
        </Button>
      )}
      :
    </Stack>
  );
};

export default TodoItem;
