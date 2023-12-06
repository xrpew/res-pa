// @ts-ignore
const ListCard = ({allDocs, deleteDocument}) => {

  return (
    <>
    {allDocs.length == 0 && <p className='p-4'>Aun no tienes reservas agendadas, crea la primera desde la parte superior ☝☝</p>}
      {allDocs.map((elemento) => (
        <div className="card" key={elemento.id}>
          <h5 className="card-header">
            {elemento.birthdate && `🎂`} {elemento.frecuent && `🚲`} {elemento.name} ({elemento.cantidad})
          </h5>
          <div className="card-body">
            <h5 className="card-title">
              {new Date(elemento.fechaYHora).toLocaleString()}
            </h5>
            <p className="card-text">
              Mesa: {elemento.mesa}
            </p>
            <p onClick={() => { deleteDocument(elemento.id, true) }} className="btn btn-primary">LLEGÓ</p>
            <p onClick={() => { deleteDocument(elemento.id, false) }} className="btn btn-danger">NO VINO</p>
          </div>
        </div>
      ))}
    </>
  )
}

export default ListCard