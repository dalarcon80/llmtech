import React, { useState } from "react";
import { useEffect } from "react/hooks";
import { useRef } from "react";
import { Camera } from "react-webcam";

const App = () => {
  const [image, setImage] = useState(null);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    // Inicializa la cámara web
    const cameraRef = useRef();
    setCamera(new Camera(cameraRef, {
      width: 640,
      height: 480,
    }));

    // Inicia la captura de la cámara web
    camera.start();

    // Obtiene una imagen de la cámara web
    const getImage = async () => {
      const data = await camera.getImageData();
      setImage(data);
    };

    // Llama a `getImage()` cada segundo
    setInterval(getImage, 1000);
  }, []);

  return (
    <div>
      <div style={{ width: "50%" }}>
        <script
          src="https://static.soulmachines.com/widget-snippet-1.12.0.min.js"
          data-sm-api-key="YOUR_API_KEY"
        ></script>
      </div>
      <div style={{ width: "50%" }}>
        {image && <img src={image} />}
      </div>
    </div>
  );
};

export default App;
