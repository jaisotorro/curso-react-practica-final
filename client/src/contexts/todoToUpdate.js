import { createContext } from "react";

const TodoToUpdate = createContext({
  current: {},
  update: () => {}
});

export default TodoToUpdate;