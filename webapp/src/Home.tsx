import React from "react";
import { Link } from "react-router-dom";

export function Home()
{
    const id = (~~(Math.random() * 0xFFFFFF)).toString(16).padStart(6, "0");
    
    return (
        <Link to={`/room/${id}`}><button>Play</button></Link>
    );
}