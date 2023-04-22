import { createContext } from "react";

const InformarTodos = createContext({
  current: false,
  update: () => {}
});

export default InformarTodos;