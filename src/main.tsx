import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './firebase/config.js'
import 'bootswatch/dist/lux/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)
