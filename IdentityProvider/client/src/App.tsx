import React, {useEffect} from 'react';
import {Route, Routes } from 'react-router-dom';
import Index from "./components/pages/Index";
import Login from "./components/pages/Login";

function App() {

    return (
        <Routes>
            <Route path='/' element={<Index />} index={true} />
            <Route path='/login/' element={<Login />} />
            <Route path='/*' element={<Index />} />
        </Routes>
    )
}

export default App;
