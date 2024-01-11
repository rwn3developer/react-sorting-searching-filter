import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import View from './pages/View';
import Add from './pages/Add';
import Edit from './pages/Edit';


function App() {
  return (
     <BrowserRouter>
        <Routes>
            <Route path='/' element={<View/>}/>
            <Route path='/addrecord' element={<Add/>}/>
            <Route path='/editrecord/:id' element={<Edit/>}/>
        </Routes>
     </BrowserRouter>
  );
}
export default App;
