import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './screens/LandingPage/LandingPage';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MyNotes from './screens/MyNotes/MyNotes';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import CreateNote from './screens/CreateNote/CreateNote';
import SingleNote from "./screens/SingleNote/SingleNote";
import { useState } from 'react';


function App() {

  const [search,setSearch]=useState("");

  return (

    <BrowserRouter>
        <Header setSearch={(s)=>setSearch(s)}/>
        <main className='App'>
          <Routes>
            <Route path='/' Component={LandingPage} exact/>
            <Route path='/login' Component={LoginScreen}/>
            <Route path='/profile' Component={ProfileScreen}/>
            <Route path='/register' Component={RegisterScreen}/>
            <Route path='/createnote' Component={CreateNote}/>
            <Route path='/note/:id' Component={SingleNote}/>
            <Route path='/mynotes' Component={()=><MyNotes search={search}/>}/>
          </Routes>
        </main>
        <Footer/>
    </BrowserRouter>
  );
};

export default App;
