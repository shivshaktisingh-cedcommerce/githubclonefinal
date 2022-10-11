import Searchfield from "./Searchfield"

import './App.css';
import { Route, Routes } from "react-router-dom";
import Githubuser from "./Githubuser";

function App() {

 
  return (
    
    <div className="App">
      <div className="search_div_class">
        <Routes>
          <Route path="/" element={<Searchfield/>}/>
          <Route path="/githubuser" element={<Githubuser/>}/>
        </Routes>
     
      
    </div>
      
    </div>
  );
}

export default App;
