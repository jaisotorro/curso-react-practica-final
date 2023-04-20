import { createContext } from "react";

const Todo = createContext({
  current: null,
  update: () => {}
});

export default Todo;