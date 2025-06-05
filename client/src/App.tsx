import './App.css';
import { BrowserRouter } from "react-router-dom";
import Sidebar from './components/Sidebar/Sidebar'
import AppRoutes from "./routes/AppRoutes.tsx";

function App() {
  return (
    <BrowserRouter>
      <div className='appContainer'>
        <Sidebar />
        <main className='content'>
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
