import './App.css';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import { Login } from './components/login/Login'
import { OptionsIndex } from './components/index/Index'
import { DDBB } from './components/sections/Base_de_datos'
import { Prestados } from './components/sections/Prestados'
import { Rotos } from './components/sections/Rotos'
import { Navbar } from './components/navbar/navbar';


function App() {
  return (
    <div className="App">

      <Router>
        <Navbar/>
        <Routes>
          <Route path="/login" Component={ Login }/>
          
          <Route path="/" Component={ OptionsIndex } />

          <Route path="/Base_de_datos" Component={ DDBB } />

          <Route path="/Prestados" Component={ Prestados } />

          <Route path="/Rotos" Component={ Rotos } />

        </Routes>
  
      </Router> 
    </div>
  );
}

export default App;
