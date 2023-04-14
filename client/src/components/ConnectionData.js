import Modal from "./Modal";
import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { getUser, getTime } from "../selectors/connection"
import store from "../store";


const ConnectionData = () => {
    const [showModal, setShowModal] = useState(false);
    const user = store.connection.user;
    const time = store.connection.time;
    // const user = useSelector((state) => getUser(state));
    // const time = useSelector((state) => getTime(state));

    // const closeModal = () => {
    //     setShowModal(false);
    //   }
    
    return (
        <section>
          <h3>Tu conexión actual:</h3>
          <Modal show={showModal} onClose={() => setShowModal(false)}>
          {/* <Modal show={showModal} onClose={closeModal}></Modal>             */}
            <h4>{"Estado conexión: " + user != "" ? "Conectado" : "Desconectado"}</h4> 
            { user != "" && <>
              <h4>{"Usuario: " + user}</h4> 
              <h4>{"Hora última conexión: " + time}</h4> 
            </>}
            <button onClick={() => setShowModal(false)}>Aceptar</button>
          </Modal>
        </section>
      );
    

}
export default ConnectionData;