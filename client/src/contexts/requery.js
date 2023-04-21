import { createContext } from "react";

const Requery = createContext({
  current: false,
  update: () => {}
});

export default Requery;