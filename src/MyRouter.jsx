import { Route, Routes } from 'react-router';
import App from './App.jsx';
import NotFound from './pages/NotFound.jsx';
import Header from './components/Header/Header.jsx';

const MyRouter = () => {
    return (
        <>
        <Header/>
        <Routes>
            <Route path='/' element={<App/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
        </>
    ); 
}

export default MyRouter