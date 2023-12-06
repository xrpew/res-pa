import './App.css';
import { collection, getDocs, DocumentData, QueryDocumentSnapshot, doc, addDoc, updateDoc } from 'firebase/firestore';
// @ts-ignore
import { db } from './firebase/config.js';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import ListCard from './components/ListCard.js';
import AcordeonContent from './components/AcordeonContent.js';
import Navbar from './components/Navbar.js';


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
  const [user, setUser] = useState({})

  const handleCreateDocument = async (values: Documento) => {
    // console.log(values)
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
    onAuthStateChanged(auth, currentUser => {
      // @ts-ignore
      setUser(currentUser)
    })
    getTodosLosDocumentos();
    console.log(user);
  }, []);

  async function getTodosLosDocumentos() {
    try {
      const snapshot = await getDocs(collection(db, "reservas"));
      let newArray: DocumentData[] = [];
      snapshot.forEach((docs: QueryDocumentSnapshot<DocumentData>) => {
        let value = docs.data()
        // console.log(value)
        value['id'] = docs.id
        if (value['show']) {
          newArray = [...newArray, value];
        }
      });
      // @ts-ignore
      const nuevoArregloOrdenado = [...newArray].sort((a, b) => new Date(a.fechaYHora) - new Date(b.fechaYHora));

      setAllDocs(nuevoArregloOrdenado);
      console.log(nuevoArregloOrdenado)
    } catch (error) {
      console.error('Error al obtener documentos:', error);
    }
  }



  const deleteDocument = async (id: string, arrived: boolean) => {
    try {
      await updateDoc(doc(db, 'reservas', id), {
        show: false,
        arrived,
      })
      getTodosLosDocumentos();
    } catch (error) {
      console.error('Error al eliminar documento:', error);
    }
  }
  const auth = getAuth()

  // signInWithEmailAndPassword(auth, 'admin@res-pas.cl', '123456')
  //   .then((userCredential) => {
  //     const user = userCredential.user;
  //     console.log(user)
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log(errorCode, errorMessage)
  //   });


  // const logOut = () => {
  //   console.log('auth')
  //   // signOut(auth)
  // }


  return (
    <>
      <Navbar handleCreateDocument={handleCreateDocument}/>
      {/* <AcordeonContent handleCreateDocument={handleCreateDocument}/> */}

      <ListCard allDocs={allDocs} deleteDocument={deleteDocument}/>
    </>
  );
}

export default App;
