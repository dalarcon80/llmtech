// App.js
import React from "react";
import SoulMachinesWidget from "./SoulMachinesWidget";

const App = () => {
  return (
    <div>
      <SoulMachinesWidget />
    </div>
  );
};

export default App;

// SoulMachinesWidget.js
import React from "react";

const SoulMachinesWidget = () => {
  return (
    <div>
      <script
        src="https://static.soulmachines.com/widget-snippet-1.12.0.min.js"
        data-sm-api-key="eyJzb3VsSWQiOiJkZG5hLWRhbmllbC1hbGFyY29uLS1kaWdpdGFsLWNoaWVmLWV4cGVyaWVuY2UiLCJhdXRoU2VydmVyIjoiaHR0cHM6Ly9kaC5hei5zb3VsbWFjaGluZXMuY2xvdWQvYXBpL2p3dCIsImF1dGhUb2tlbiI6ImFwaWtleV92MV9lNmYxZTA3OS00ODI1LTQ2YjUtYjE5ZC05YjEwYzRjNDUzNjEifQ=="
      />
    </div>
  );
};

export default SoulMachinesWidget;
