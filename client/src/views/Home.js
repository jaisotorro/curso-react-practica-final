 /**
 * Pagina principal
 */
const Home = () => (
  <section aria-describedby="desc">
    {/* <NoExisto />  componente inexistente para provocar error */}
    <p id="desc">
      <h2>Bienvenido a mi aplicación de gestion de tareas, donde podrás realizar las siguientes operaciones</h2>
      <h3>
      <ul>
        <li>Crear una nueva cuenta </li>
        <li>Etc... </li>
      </ul>
      </h3>
    </p>
  </section>
);

export default Home;