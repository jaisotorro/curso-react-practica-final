 /**
 * Pagina principal
 */
const Home = () => (
  <section aria-describedby="desc">
    {/* <NoExisto />  componente inexistente para provocar error */}
      <h2>Bienvenido a mi aplicación de gestion de notas, donde podrás realizar las siguientes operaciones</h2>
      <h3>
      <ul>
        <li>Crear una cuenta de usuario </li>
        <li>Conectarte con tu usuario y contraseña</li>
        <li>Desconectarte</li>
        <li>Consultar los datos de tu conexión actual</li>
        <li>Gestionar tus notas. (necesitas estar conectado).  Esto incluye:: </li>
        <h4>
        <ul>
        <li>Consultar tus notas</li>
        <li>Reordenarlas</li>
        <li>Crear una nueva nota</li>
        <li>Modificar una nota existente</li>
        <li>Eliminar una nota</li>
        </ul>
        </h4>
      </ul>
      </h3>
  </section>
);

export default Home;