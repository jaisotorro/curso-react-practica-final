import "../styles/Layout.css";

/**
 * Engloba el contenido principal en un contendor para 
 * centrar el layout
 */
const Layout = ({ title, children }) => (
  <div className="layout">
    <header className="layout_header">
      <h1>{title}</h1>
      <nav className="layout_nav">
        <ul>
          <li>
            {/* <a href="https://github.com/TRAININGIT-REACT-II/Curso" target="_blank" rel="noopener noreferrer"> */}
            <a href="https://github.com/jaisotorro/curso-react-practica-final" target="_blank" rel="noopener noreferrer">            
              Mi repositorio
            </a>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      {children}
    </main>
  </div>
);

export default Layout;