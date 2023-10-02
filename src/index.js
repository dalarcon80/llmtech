import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppDocuments from './Pages/AppDocuments'
import App from './Pages/App';
//import DownloadListDocuments from './Pages/DownloadList';
//import AzureBlobUploader from './Pages/AzureBlobUploader';

import AzureBlobUploader from './Pages/AzureBlobUploader';
import FileList from './Pages/FileListBlob';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>} />
      <Route path='/test' element={<AppDocuments/>} />
      <Route path='/documentos' element={<AzureBlobUploader/>}/>
      <Route path='/testDownload' element={<FileList/>}/>
    </Routes>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
