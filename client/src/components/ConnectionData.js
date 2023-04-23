import Modal from "./Modal";
import { useState } from "react";
 import { useSelector} from "react-redux";
import { getUser, getTime } from "../selectors/connection"
import store from "../store";

import connection from "../reducers/connection";
// import user from "./reducers/user";

import * as userActions from "../actions/user";

import { getName } from "../selectors/user";




const ConnectionData = () => {

  const [showModal, setShowModal] = useState(false);
  
  const usuario = useSelector((state) => getUser(state));
  const time = useSelector((state) => getTime(state));

  // const usuario = useSelector((state) => getName(state)); // provis
  // const time = null; // provis
  
  
  // const user = store.connection.user;
    // const time = store.connection.time;

    // const user = useSelector(getUser);
    //  const time = useSelector((state) => state.connection.time);
    

    // const closeModal = () => {
    //     setShowModal(false);
    //   }
    
    return (
        <section>
          <h3>Tu conexión actual:</h3>
          {/* <Modal show={showModal} onClose={() => setShowModal(false)}> */}
          {/* <Modal show={showModal} onClose={closeModal}></Modal>             */}
            <h4>{usuario != null ? "Estás conectado" : "Estás desconectado"}</h4>
            {usuario != null &&
              <> 
                <h4>{"Usuario: " + usuario}</h4> 
                <h4>{"Fecha/Hora conexión: " + time}</h4> 
              </>
            }
            <button onClick={() => setShowModal(false)}>Aceptar</button>
          {/* </Modal> */}
        </section>
      );
    

}
export default ConnectionData;