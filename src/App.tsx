import './App.css';
import { collection, getDocs, DocumentData, QueryDocumentSnapshot, doc, addDoc, updateDoc } from 'firebase/firestore';
// @ts-ignore
import { db } from './firebase/config.js';
import { useEffect, useState } from 'react';
import LoginContent from './components/LoginContent.js';


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


function App() {
  const [allDocs, setAllDocs] = useState<DocumentData[]>([]);


  const handleCreateDocument = async (values: Documento) => {
    console.log(values)
    try {
      const refPedido = collection(db, 'reservas');
      await addDoc(refPedido, values);
      console.log('Nuevo documento agregado correctamente');
      getTodosLosDocumentos();


    } catch (error) {
      console.error('Error al agregar nuevo documento:', error);
    }
  }


  useEffect(() => {
    getTodosLosDocumentos();
    console.log('refresh');
  }, []);

  async function getTodosLosDocumentos() {
    try {
      const snapshot = await getDocs(collection(db, "reservas"));
      let newArray: DocumentData[] = [];
      snapshot.forEach((docs: QueryDocumentSnapshot<DocumentData>) => {
        let value = docs.data()
        console.log(value)
        value['id'] = docs.id
        if (value['show']) {
          newArray = [...newArray, value];
        }

        console.log(newArray)
      });
      console.log(newArray)
      // @ts-ignore
      const nuevoArregloOrdenado = [...newArray].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

      console.log(nuevoArregloOrdenado)
      setAllDocs(nuevoArregloOrdenado);
    } catch (error) {
      console.error('Error al obtener documentos:', error);
    }
  }



  const deleteDocument = async (id: string, arrived: boolean) => {
    console.log(id);
    try {
      await updateDoc(doc(db, 'reservas', id), {
        show: false,
        arrived,
      })
      getTodosLosDocumentos(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error al eliminar documento:', error);
    }
  }
  return (
    <>
      <div className="accordion f" id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
              Agregar una reserva
            </button>
          </h2>
          <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
            <div className="accordion-body">
              <LoginContent handlePassingDataOnIndex={handleCreateDocument} />
            </div>
          </div>
        </div>
      </div>
      {allDocs.length == 0 && <p className='p-4'>Aun no tienes reservas agendadas, crea la primera desde la parte superior ☝☝</p>  }
      {allDocs.map((elemento) => (
        <div className="card" key={elemento.id}>
          <h5 className="card-header">{elemento.fecha}</h5>
          <div className="card-body">
            <h5 className="card-title">
            {elemento.birthdate && `🎂`} {elemento.frecuent && `🚲`} {elemento.name} ({elemento.cantidad}) 
              </h5>
            <p className="card-text">Mesa: {elemento.mesa}</p>
            <p onClick={() => { deleteDocument(elemento.id, true) }} className="btn btn-primary">LLEGÓ</p>
            <p onClick={() => { deleteDocument(elemento.id, false) }} className="btn btn-danger">NO VINO</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default App;
