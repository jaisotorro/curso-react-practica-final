import React from "react";
import { PATHS } from "../constants/paths";
import { Route, Router, NavLink } from "react-router-dom";
import Home from "../views/Home";

/**
 * Este componente necesita ser de tipo clase, ya que no existen ningún comportamiento
 * similar en hooks.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    this.state = {
      error: false
    };
  }

  /**
   * Este método se ejecuta en la fase de "render". Permite actualizar el estado
   * durante el proceso de reconciliación.
   *
   * El objetivo de este método es modificar el estado para mostrar renderizar un
   * mensaje de error u otro componente en la interfaz
   */
  static getDerivedStateFromError() {
    return {
      error: true
    };
  }

  /**
   * Este método se ejecuta durante la fase de commit. Se utiliza para acciones
   * posteriores a la recuperación del error como enviar este y su traza a
   * servicios externos como Airbrake o Sentry
   */
  componentDidCatch(error, info) {
    console.log(error, info);
  }

  /**
   * Llama al método onReset que recibe por las propiedades y reinicia el error
   */
  onClick() {
    this.props.onReset();
    this.setState({ error: false });
  }

  render() {
    // Si ha habido un error, mostramos el mensaje y un botón para reiniciar el estado
    if (this.state.error === true) {
      return (
        <section aria-label="Hubo un error en la aplicacion">
          {/* <Router> => da error en Router al renderizar este componente
            <NavLink exact activeClassName="active" to={ROOTPATH}>
              Inicio
            </NavLink>
            <Route path={ROOTPATH} exact>              
                <Home />
              </Route>
          </Router> */}
          <h1>{this.props.message}</h1>
          <button onClick={this.onClick}>Volver</button>
        </section>
      );
    }
    return this.props.children;

    // No me sirve, no incluye los enlaces
    // if (this.props.home) {
    //   return(
    //     <Home />
    //   );
    // }
    
    // if (!this.props.home) {
    //   return this.props.children;
    // }
  }
}

export default ErrorBoundary;
