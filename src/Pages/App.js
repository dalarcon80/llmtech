import React, { useEffect } from 'react';

const SoulMachinesEmbed = () => {
  useEffect(() => {
    // Código para cargar el script de Soul Machines
    const script = document.createElement('script');
    script.src = 'https://static.soulmachines.com/widget-snippet-1.12.0.min.js';
    script.dataset.smApiKey =
      'eyJzb3VsSWQiOiJkZG5hLWRhbmllbC1hbGFyY29uLS1kaWdpdGFsLWNoaWVmLWV4cGVyaWVuY2UiLCJhdXRoU2VydmVyIjoiaHR0cHM6Ly9kaC5hei5zb3VsbWFjaGluZXMuY2xvdWQvYXBpL2p3dCIsImF1dGhUb2tlbiI6ImFwaWtleV92MV9lNmY1MTgxNzItZDIxOC00MDA1LWI3YzctNzUxODRkODM0NmRlIn0=';
    document.body.appendChild(script);

    return () => {
      // Elimina el script cuando el componente se desmonte
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Puedes agregar cualquier contenido adicional aquí */}
    </div>
  );
};

export default SoulMachinesEmbed;
