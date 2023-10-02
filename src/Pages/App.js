import React, { useEffect, useRef } from 'react';

function App() {
  // Ref para la etiqueta de vídeo
  const videoRef = useRef(null);

  useEffect(() => {
    // Código para cargar el script de Soul Machines
    const script = document.createElement('script');
    script.src = 'https://static.soulmachines.com/widget-snippet-1.12.0.min.js';
    script.dataset.smApiKey = 'YOUR_API_KEY'; // Reemplaza con tu clave API

    // Añadir el script al cuerpo del documento
    document.body.appendChild(script);

    // Código para acceder a la cámara web y mostrarla en la mitad derecha
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error al acceder a la cámara: ', error);
      });

    return () => {
      // Limpia el script cuando el componente se desmonte
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="App">
      <div className="left-half">
        {/* Contenedor para el script de Soul Machines */}
        {/* Asegúrate de reemplazar YOUR_API_KEY con tu clave API real */}
        <script
          src="https://static.soulmachines.com/widget-snippet-1.12.0.min.js"
          data-sm-api-key="eyJzb3VsSWQiOiJkZG5hLWRhbmllbC1hbGFyY29uLS1kaWdpdGFsLWNoaWVmLWV4cGVyaWVuY2UiLCJhdXRoU2VydmVyIjoiaHR0cHM6Ly9kaC5hei5zb3VsbWFjaGluZXMuY2xvdWQvYXBpL2p3dCIsImF1dGhUb2tlbiI6ImFwaWtleV92MV9lNmYxZTA3OS00ODI1LTQ2YjUtYjE5ZC05YjEwYzRjNDUzNjEifQ=="
        ></script>
      </div>
      <div className="right-half">
        {/* Contenedor para mostrar la cámara web */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          width="100%"
          height="100%"
        ></video>
      </div>
    </div>
  );
}

export default App;
