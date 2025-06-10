import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Halamanlogin from "./component/Halamanlogin"; // Gunakan PascalCase untuk komponen
import Register from './component/Register';
import HalamanAdmin from './component/HalamanAdmin';
import HalamanUtama from './component/HalamanUtama';
import Navbar from './component/Navbar';
import HalamanLoading from './component/HalamanLoading';
import Input from './component/Input';
import DetailAdmin from './component/DetailAdmin';

function App() {
  return (
    <BrowserRouter>
<Routes>
        <Route path="/" element={<HalamanLoading />} />
        <Route path="/input" element={<><Navbar /><Input /></>} />
        <Route path="/login" element={<Halamanlogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admindashboard" element={<><Navbar /><HalamanAdmin /></>} />
        <Route path="/HalamanUtama" element={<><Navbar /><HalamanUtama /></>} />
        <Route path="/detailsurat/:id" element={<><Navbar /><DetailAdmin /></>} />

      </Routes>     
    
    </BrowserRouter>
  );
}

export default App;
