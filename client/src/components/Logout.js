import {useContext, useEffect, useState } from "react"
import Token from "../contexts/token";
import Home from "../views/Home";
import { useDispatch } from "react-redux";
import { disconnect } from '../actions/connection';
import { Result } from "../views/Result";

const Logout = () => {
    const dispatch = useDispatch();
    const token = useContext(Token);
    // const [desconectando, setDesconectando] = useState(false);
    const [resultMsg, setResultMsg] = useState(null);

    useEffect(
        () => {
            console.log("*** En Logout-useEffect");
            if (token.current && token.current != "") {
                token.update("");
                localStorage.setItem('token', "");
                // dispatch(addTodo(disconnect));
                setResultMsg("Te has desconectado correctamente. Gracias por usar mi aplicación¡¡");
            } else {
                if (resultMsg == null){
                    setResultMsg("No estabas conectado. Para desconectarte, debes estar previamente conectado");
                }
            }
        
        },
        [token]
    );

    return <Result msg = {resultMsg} />

}
export default Logout;