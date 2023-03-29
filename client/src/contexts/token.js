import { createContext } from "react";

const Token = createContext({
  // Valor actual
  current: "",
  update: () => {}
});

export default Token;