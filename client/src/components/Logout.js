import {useContext, useEffect } from "react"
import Token from "../contexts/token";
import Home from "../views/Home";
import { useDispatch } from "react-redux";
import { disconnect } from '../actions/connection';

const Logout = () => {
    const dispatch = useDispatch();
    const token = useContext(Token);
    // const [desconectando, setDesconectando] = useState(false);

    useEffect(
        () => {
            console.log("*** En Logout-useEffect");
            if (token.current && token.current != "") {
                token.update("");
                localStorage.setItem('token', "");
                dispatch(addTodo(disconnect));
            }
        
        },
        [token]
    );

    return (<Home />);

}
export default Logout;