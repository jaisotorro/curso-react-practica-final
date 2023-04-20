import { createContext } from "react";

const ModalType = createContext({
  current: "",
  update: () => {}
});

export default ModalType;