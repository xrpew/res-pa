import React, { useEffect, useState } from 'react';
import tableIcon from '../assets/mesa-de-comedor.png'

interface Documento {
    name: string;
    mesa: string;
    cantidad: number;
    fechaYHora: string;
    show: boolean;
    arrived: boolean;
    frecuent: boolean;
    birthdate: boolean;
}

interface LoginContentProps {
    handlePassingDataOnIndex: (data: Documento) => void;
}

const LoginContent: React.FC<LoginContentProps> = ({ handlePassingDataOnIndex }) => {

    const [fechaYHora, setFechaYHora] = useState((new Date()).toISOString().slice(0, 16));
    const [name, setName] = useState('')
    const [cantidad, setCantidad] = useState(2)
    const [isAllWrite, setIsAllWrite] = useState<boolean>(false)
    const [mesa, setMesa] = useState('')
    const [frecuent, setFrecuent] = useState(false)
    const [birthdate, setBirthdate] = useState(false)

    const hanldleAddEvent = async (e: any) => {
        e.preventDefault()
        let values: Documento = {
            mesa: mesa,
            name: name,
            cantidad: cantidad,
            fechaYHora: fechaYHora,
            show: true,
            arrived: false,
            frecuent: frecuent,
            birthdate: birthdate,
        }
        // ignore
        handlePassingDataOnIndex(values)
        setName('')
        setCantidad(2)
        setIsAllWrite(false)
        setMesa('')
        setFrecuent(false)
        setBirthdate(false)
    }

    useEffect(() => {
        if (name !== '' && mesa !== '') {
            if ((name.split(' ')).length > 1) {
                if (name.split(' ')[1].length > 1) {
                    setIsAllWrite(true)
                }
            }
        } else {
            setIsAllWrite(false)
        }
    }, [name, mesa])

    return (
        <>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Nueva reserva</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <body className="d-flex text-center align-items-center bg-body-tertiary">
                            <main className="form-signin w-100" id='formulario'>
                                <form>
                                    <img className="m-2" src={tableIcon} alt="" width="72" height="57" />
                                    <h1 className="h3 m-3 mb-3 fw-normal">Ingresa todos los datos</h1>

                                    <div className="form-floating m-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="andres ibarra"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            required />
                                        <label htmlFor="floatingInput">Nombre Completo</label>
                                    </div>
                                    <div className="form-floating m-2">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="floatingNumberOfPeoples"
                                            placeholder="numero de comensales"
                                            value={cantidad}
                                            onChange={e => setCantidad(parseInt(e.target.value))}
                                            max={20}
                                            min={1}
                                            required
                                        />
                                        <label htmlFor="floatingNumberOfTable">Numero de comensales</label>
                                    </div>
                                    <div className="form-floating m-2">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="floatingNumberOfTable"
                                            placeholder="numero de mesa"
                                            value={mesa}
                                            onChange={e => setMesa(e.target.value)}
                                            required
                                        />
                                        <label htmlFor="floatingNumberOfTable">Numero de mesa</label>
                                    </div>
                                    <div className="form-floating m-2">
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            id="floatingDateandHour"
                                            value={fechaYHora}
                                            onChange={(e) => setFechaYHora(e.target.value)}
                                            placeholder="2022-02-22"
                                        />
                                        <label htmlFor="floatingDateandHour">Fecha y hora</label>
                                    </div>

                                    <div className="form-check text-start m-3">
                                        <input className="form-check-input" type="checkbox" checked={frecuent} value="frecuent" id="flexCheckDefault" onChange={(e) => setFrecuent(e.target.checked)} />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Frecuente
                                        </label>
                                    </div>
                                    <div className="form-check text-start m-3">
                                        <input className="form-check-input" type="checkbox" checked={birthdate} value="birthday" id="flexCheckDefault2" onChange={(e) => setBirthdate(e.target.checked)} />
                                        <label className="form-check-label" htmlFor="flexCheckDefault2">
                                            Cumpleaños
                                        </label>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger w-50 m-0" data-bs-dismiss="modal">cerrar</button>
                                        <button type="button" className="btn btn-primary w-50 m-0" data-bs-dismiss="modal" onClick={(e) => hanldleAddEvent(e)} disabled={!isAllWrite} >agregar</button>
                                    </div>
                                </form>
                            </main>
                            <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
                        </body>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginContent