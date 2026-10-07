import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';

export default function App(){return <><Toaster position="top-right" toastOptions={{duration:2500}}/><BrowserRouter><Routes><Route path="/" element={<Home/>}/><Route path="/editor/:roomId" element={<EditorPage/>}/></Routes></BrowserRouter></>}
