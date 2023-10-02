import { Component } from "react";
import '../App.css'
import { Link } from "react-router-dom";

const Aside = ({ clearChat }) => {

    return (
        <aside className='sidemenu' >
            <Link to={"/"} className="text-button">
                <div className='sidemenu-button' onClick={clearChat}>
                    <span>+</span>
                    Nuevo Chat
                </div>
            </Link>

            <Link to={"/documentos"} className="text-button">
                <div className='sidemenu-button documentos' onClick={clearChat}>
                    <span>+</span>
                    Documentos
                </div>
            </Link>
        </aside>
    )

}

export default Aside