import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  TextField,
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import TodoItem from "./Component/TodoItem";
const App = () => {
  const [todoList, setTodoList] = useState<TodoItemType[]>([]);
  const [curTodoName, setCurTodoName] = useState<string>("");
  const isFirstRender = useRef<boolean>(true);

  useEffect(() => {
    const data: string | null = localStorage.getItem("todoList");
    const todoList = data ? JSON.parse(data) : [];
    setTodoList([...todoList]);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) isFirstRender.current = false;
    else localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const handleAddTodo = (index: number): void => {
    setTodoList([
      ...todoList,
      { title: curTodoName, isCompleted: false, id: index },
    ]);
    localStorage.setItem(
      "todoList",
      JSON.stringify([
        ...todoList,
        { title: curTodoName, isCompleted: false, id: index },
      ])
    );
  };
  const handleCompletedTodo = (id: number): void => {
    const index: number = todoList.findIndex((i) => i.id === id);
    todoList[index].isCompleted = !todoList[index].isCompleted;
    setTodoList([...todoList]);
  };
  const handleEditTodo = (val: string, id: TodoItemType["id"]): void => {
    const index: number = todoList.findIndex((i) => i.id === id);
    todoList[index].title = val;
    setTodoList([...todoList]);
  };
  const handleDeleteTodo = (id: TodoItemType["id"]): void => {
    const index: number = todoList.findIndex((t) => t.id === id);
    todoList.splice(index, 1);
    console.log({ todoList });
    setTodoList([...todoList]);
  };

  return (
    <Container maxWidth="sm" sx={{ height: "50vh", marginY: "1rem" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography>TODO APP</Typography>
        </Toolbar>
      </AppBar>
      <Stack height={"80%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
        {todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleCompletedTodo={handleCompletedTodo}
            handleEditTodo={handleEditTodo}
            handleDeleteTodo={handleDeleteTodo}
          />
        ))}
      </Stack>
      <TextField
        fullWidth
        label={"Add New Task"}
        value={curTodoName}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          console.log(e.target.value), setCurTodoName(e.target.value);
        }}
      />
      <Button
        sx={{ margin: "1rem 0" }}
        fullWidth
        variant="contained"
        onClick={() => {
          handleAddTodo(todoList.length), setCurTodoName("");
        }}
      >
        Add
      </Button>
    </Container>
  );
};

export default App;
