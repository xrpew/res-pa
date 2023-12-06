import LoginContent from './LoginContent'
// @ts-ignore
const AcordeonContent = ({handleCreateDocument}) => {
  return (
    <div className="accordion f" id="accordionPanelsStayOpenExample">
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
          Agregar una reserva
        </button>

      </h2>
      <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show text-center">
        <div className="accordion-body">
          <LoginContent handlePassingDataOnIndex={handleCreateDocument}/>
        </div>

      </div>
    </div>
  </div>
  )
}

export default AcordeonContent