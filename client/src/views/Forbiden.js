import { NavLink } from "react-router-dom";
const Forbiden = ({functionality}) => {
    return (<>
        <h1>{"Debes estar conectado para acceder a "+functionality}</h1>
        <NavLink exact activeClassName="active" to="/">
              Volver a Inicio
        </NavLink>{" "}
    </>)
}
export default Forbiden;