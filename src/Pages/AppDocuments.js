import '../header.css'
import Navbar from '../Components/Navbar'
import axios from "axios";

import '../App.css'
import { useState } from 'react'
import React from 'react';
//import ChatMessage from './Components/ChatMessage';
//import Loader from './Components/Loader';
import Aside from '../Components/AsideComponent';
import ReciclerViewChat from '../Components/ReciclerViewChat';
//import ChatInputHolder from './Components/ChatInputTextHolderComponent';
//import { BrowserRouter, Routes, Route } from 'react-router-dom'


const url = "https://am-ecp-llm.azure-api.net/func-openai-llm-ecp/HttpTrigger1_API"
const urlUploadFile = "https://sallmpocecpsbx.blob.core.windows.net/"

const apiKeyUploadBlobStorage = "UNOHOEG5HF1G4cZTgiBrU+4HHJhsxRW0uA/faIiiirHueJKf3nK5Zl2JDlaeyUmH+nM3d1f5Qvek+ASt68fi0Q=="

const fetchData = async (query) => {
    const payload = {
        query: query + ". Responde en español y especifica el source."
    };

    try {
        console.log("\nCargando respuesta ...\n");

        const response = await axios.post(url, payload);
        console.log("respuesta ", response)

        if (response.status === 200) {
            const data = response.data;
            //console.log('Respuesta:', data.response);
            return data.response;
        } else {
            console.error('Error:', response.data);
            throw new Error('Something went wrong');
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw new Error('Something went wrong');
    }
};

const App = () => {

    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false);
    const [loadFile, setLoadFile] = useState(null);
    const [progress, setProgress] = useState({ started: false, pc: 0 });
    const fileInputRef = React.createRef();


    const [chatlog, setChatLog] = useState([{
        user: "genaichat",
        message: "Hola soy GenAI de Accenture te ayudare con todas tus consultas. " +
            "Tengo limitaciones y a veces me equivoco, pero tus " +
            "comentarios me ayudarán a mejorar.",
        loadingMsn: 1
    }
    ])

    function handleSubmit(e) {
        e.preventDefault();

        setLoading(true)


        setChatLog([...chatlog, { user: "genaichat", message: `${input}`, loadingMsn: 2 }])
        setInput("")

        async function response() {
            try {
                const response = await fetchData(input);
                //apago animacion
                setChatLog(chatlog => [...chatlog, { user: "genAI", message: `${response}`, loadingMsn: 3 }])
                setLoading(false)

            } catch (error) {
                setLoading(false)
                console.error('Error:', error.message);
                setChatLog([...chatlog, { user: "genAI", message: "Respuesta no encontrada..." }])
            }

        }

        response()


    };

    const handleFileSelected = () => {
        fileInputRef.current.click();
    }




    const handleFileUpload = (file) => {
        if (!file) {
            setChatLog(chatlog => [...chatlog, {
                user: "genaichat",
                message: "No se ha seleccionado ningún archivo",
                loadingMsn: 3
            }])

            return;
        }

        setChatLog(chatlog => [...chatlog, {
            user: "genaichat",
            message: `Subiendo el archivo: ${file.name}`,
            loadingMsn: 3
        }])

        const formData = new FormData();
        formData.append('file', file);

        axios.put(`${urlUploadFile}?${apiKeyUploadBlobStorage}`, formData, {
            headers: {
                'x-ms-blob-type': 'BlockBlob',
                'Content-Type': 'multipart/form-data'
            },
        })
            .then((response) => {
                // Handle successful upload response
                console.log('File uploaded successfully:', response.data);
            })
            .catch((error) => {
                // Handle upload error
                console.error('Error uploading file:', error.response.data);
            });

    }

    const handleFileChange = (event) => {
        setLoadFile(event.target.files[0]);
        let file = event.target.files[0]
        handleFileUpload(file)
        console.log(file.name)

        //handleFileUpload()



    };



    function clearChat() {
        setChatLog([{
            user: "genaichat",
            message: "Hola soy GenAI de Accenture te ayudare con todas tus consultas. " +
                "Tengo limitaciones y a veces me equivoco, pero tus " +
                "comentarios me ayudarán a mejorar.",
            loadingMsn: 1
        }])

    }


    return (

        <div className='App'>
            <Navbar />
            <div className='App-body'>
                <Aside clearChat={clearChat} />
                <section className='chatbox'>
                    <ReciclerViewChat loading={loading} chatlog={chatlog} />
                    <div
                        className='chat-input-textholder'>
                        <span className='buttonUpload' onClick={handleFileSelected}><img src={require(`../img/upload.png`)} /></span>
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                    </div>
                </section>
            </div>
        </div>
    )

}
export default App;
