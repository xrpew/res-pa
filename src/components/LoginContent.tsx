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
    handlePassingDataOnIndex: (data: Documento) => void; // Reemplaza YourDataType con el tipo correcto
  }

const LoginContent: React.FC<LoginContentProps> = ({ handlePassingDataOnIndex }) => {

    const [fechaYHora, setFechaYHora] = useState((new Date()).toISOString().slice(0, 16));
    const [name, setName] = useState('')
    const [cantidad, setCantidad] = useState<Number>(2)
    const [isAllWrite, setIsAllWrite] = useState<boolean>(false)
    const [mesa, setMesa] = useState('')
    const [frecuent, setFrecuent] = useState(false)
    const [birthdate, setBirthdate] = useState(false)

    const hanldleAddEvent = async (e) => {
        e.preventDefault()
        let values = { 
            mesa: mesa, 
            name: name, 
            cantidad: cantidad, 
            fecha: fechaYHora, 
            show: true, 
            arrived:false,
            frecuent: frecuent,
            birthdate: birthdate,
        }
        handlePassingDataOnIndex(values)
        setName('')
        setCantidad(2)
        setIsAllWrite(false)
        setMesa('')
    }

    const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nuevoValor = Number(e.target.value);
        setCantidad(nuevoValor);
    };

    useEffect(() => {
        if (name !== '' && mesa !== '') {
            if((name.split(' ')).length > 1){
                if(name.split(' ')[1].length > 1){
                    setIsAllWrite(true)
                }
            }
        } else {
            setIsAllWrite(false)
        }
        console.log((name.split(' ')).length)
    }, [name, mesa])

    return (

        <body className="d-flex align-items-centerbg-body-tertiary">

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
                    <div className="form m-2">
                        <label className='m-4' htmlFor="rangeInput">Numero de comensales: {cantidad}</label>
                        <input
                            type="range"
                            className="form-range"
                            id="rangeInput"
                            value={cantidad}
                            onChange={handleRangeChange}
                            min={1}
                            max={20}
                        />
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
                        <input className="form-check-input" type="checkbox" checked={frecuent} value="frecuent" id="flexCheckDefault"  onChange={(e)=>setFrecuent(e.target.checked)}/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Frecuente
                        </label>
                    </div>
                    <div className="form-check text-start m-3">
                        <input className="form-check-input" type="checkbox" checked={birthdate} value="birthday" id="flexCheckDefault2" onChange={(e)=>setBirthdate(e.target.checked)}/>
                        <label className="form-check-label" htmlFor="flexCheckDefault2">
                            Cumpleanios
                        </label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" onClick={hanldleAddEvent} disabled={!isAllWrite} >Sign in</button>
                </form>
            </main>
            <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>

        </body>
    )
}

export default LoginContent