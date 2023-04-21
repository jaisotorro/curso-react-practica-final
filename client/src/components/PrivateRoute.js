import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Token from "../contexts/token";
import { PATHS } from "../constants/paths";

const PrivateRoute = ({ children, ...others }) => {
    const token = useContext(Token);

    return(
        <Route
            {...others}
            render={() =>
                token && token.current && token.current != "" ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: ROOTPATH + PATHS.login,
                            state: { msg: "Para acceder a esta funcionalidad, debes estar conectado" }
                        }}
                    />
                )
            }
        />
    );
};
export default PrivateRoute;