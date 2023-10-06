import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Home from './routes/home';
import Layout from './components/Layout';
import Register from './routes/register';
import Login from './routes/login';
import PostNote from './routes/PostNote';
import NoPage from './routes/NoPage';
import { UserContext, UserContextProvider } from './userContext';
import { useContext } from 'react';
import CardMoreInfo from './routes/cardMoreInformation';
import ContactUs from './routes/contactUs';
import About from './routes/about';


function App() {

  const {UserInfo} = useContext(UserContext)
  const username = UserInfo?.username

  return (
    <div className="bg-dark text-white min-vh-100 p-0">
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/postNote' element={<PostNote />} />
            <Route path= '/register' element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cardMoreInfo" element={<CardMoreInfo />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
    </div>
);
}

export default App;
