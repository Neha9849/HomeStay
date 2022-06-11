import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home/Home';
import AddRoom from './components/AddRoom/AddRoom';
import Rooms from './components/Rooms/Rooms';
import Form from './components/Form/Form';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/add" element={<AddRoom/>} />
      <Route path="/rooms" element={<Rooms/>} />
      <Route path="/host" element={<Form/>} />
    </Routes>
    </BrowserRouter>
    </>
   
  );
}

export default App;
