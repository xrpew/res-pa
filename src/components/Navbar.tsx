import LoginContent from './LoginContent'

// @ts-ignore
const Navbar = ({handleCreateDocument}) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#"> reservas El Pasaje</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Sesion
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">cerrar sesion</a></li>
          </ul>
        </li>
      </ul> */}
     <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">nueva reserva</button>
     <div className="modal fade" id="exampleModal" tabIndex={1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <LoginContent handlePassingDataOnIndex={handleCreateDocument}/>
    </div>
    </div>
  </div>
</nav>
  )
}

export default Navbar