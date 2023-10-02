//import React, { useState } from 'react';
//const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
//import React, { useState } from 'react';
import Navbar from '../Components/Navbar'
import Aside from '../Components/AsideComponent';
import ReciclerViewChat from '../Components/ReciclerViewChat';


//import { BlobServiceClient } from "@azure/storage-blob";
import ReciclerViewFiles from "../Components/ReciclerViewFiles";

import React, { useState, useEffect } from "react";
const { BlobServiceClient } = require("@azure/storage-blob");

const account = 'sallmpocecpsbx';
//const sas = '?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-08-04T05:15:52Z&st=2023-08-03T21:15:52Z&spr=https&sig=W117b925GqIPVOOo07I7KwkpUskE8h7NM96Ap1pAj%2FE%3D'

const sasToken = '?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-08-11T05:40:47Z&st=2023-08-09T21:40:47Z&spr=https&sig=PEX1SoRb4uzgmW3MzgOv%2FgHawtD8QgwicJKnnpBUy0A%3D'
const blobService = new BlobServiceClient(`https://${account}.blob.core.windows.net${sasToken}`)





const AzureBlobUploader = () => {
    //const [selectedFile, setSelectedFile] = useState(null);
    const [FileName,setFileName] = useState([])

    const [chatlog,setChatLog] = useState([{
        user: 'genaichat',
        message: "Hola soy GenAI te presento mi listado de documentos " +
        "con el cual te respondo todas tus preguntas.",
        loadingMsn: 1
    }])

    const [loading,setLoading] = useState(false)
    const fileInputRef = React.createRef();
    const [loadFile,setLoadFile] = useState(null)


    /*const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };*/


    function clearChat(){
        setChatLog([{
            user: 'genaichat',
            message: "Hola soy GenAI te presento mi listado de documentos " +
            "con el cual te respondo todas tus preguntas.",
            loadingMsn: 1
        }])
    }

    const handleFileSelect = () => {
        fileInputRef.current.click();
    }


    //Function Upload File
    const handleFileUpload = async (selectedFile) => {
        // Your Azure Storage account name and account key

        // Create a SharedKeyCredential object to authorize the requests

        // Construct the connection string for the Azure Blob Storage

        // Create a BlobServiceClient to interact with the Blob Storage service
        const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net${sasToken}`);

        // Get a reference to the "bronze" container
        const containerClient = blobServiceClient.getContainerClient('bronze');

        if (!selectedFile) {
            alert('Please select a file.');
            return;
        }

        try {
            // Create a unique name for the blob (you can use any logic to generate a unique name)
            const fileName = `document_${Date.now()}_${selectedFile.name}`;

            // Get a block blob client to upload the file
            const blockBlobClient = containerClient.getBlockBlobClient(fileName);

            // Upload the selected file to the Blob Storage
            await blockBlobClient.uploadBrowserData(selectedFile);

            // Show a success message or handle the response as needed
            console.log('File uploaded successfully!');
            setChatLog(chatlog => [...chatlog, {
                user: "genaichat",
                message: `Documento cargado con éxito lo puedes encontrar como: ${fileName}`,
                loadingMsn: 3
            }])
        } catch (error) {
            // Handle any errors that occur during the upload
            console.error('Error uploading the file:', error);
            setChatLog(chatlog => [...chatlog, {
                user: "genaichat",
                message: `Error cargando el documento ${error}`,
                loadingMsn: 3
            }])
        }
    };

    const handleFileChange = (event) => {
        setLoadFile(event.target.files[0]);
        let file = event.target.files[0]
        handleFileUpload(file)
        console.log(file.name)

        //handleFileUpload()
    };

    useEffect(()=>{
        const getFiles = async ()=> {
            const containerClient = blobService.getContainerClient('bronze')
            let blobs = []
            for await (const blob of containerClient.listBlobsFlat()){
                if(blob.name.endsWith('.pdf')){
                    const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
                    const downloadUrl = blockBlobClient.url
                    //blobs.push(blob.name)
                    blobs.push({
                        name: blob.name,
                        downloadUrl
                    })
                }
            }
            setFileName(blobs)
        }
        getFiles();

    },[])



    

    return (

        <div className='App'>
            <Navbar />
            <div className='App-body'>
                <Aside clearChat={clearChat}/>

                <section className='chatbox'>
                    <ReciclerViewChat loading={loading} chatlog={chatlog} />
                    <ReciclerViewFiles FileName = {FileName}/>
                    <div className='chat-uploadFile-textholderr'>
                        <span className='buttonUpload' onClick={handleFileSelect}><img src={require(`../img/upload.png`)} /></span>
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                    </div>
                </section>
            </div>
        </div>

    );
};


export default AzureBlobUploader;
