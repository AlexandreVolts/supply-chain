import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Infos } from "./Infos";
import { InformativeBox } from "./InformativeBox";

interface ChainProps
{
    infos:Infos;
}

export function Chain(props:ChainProps)
{
    return (
        <div style={styles.container}>
            <div>
                <InformativeBox color="#e74c3c" text="Manquant" value={props.infos.debt} />
                <InformativeBox color="#2980b9" text="Stock final" value={props.infos.stock} />
            </div>
            <FaArrowLeft />
            <InformativeBox color="#27ae60" text="Demande" value={props.infos.supply} />
            <FaArrowLeft />
            <InformativeBox color="#2980b9" text="Stock initial" value="5" />
            <FaArrowLeft />
            <InformativeBox color="#95a5a6" text="Réception" value={props.infos.supply} />
        </div>
    );
}

const styles = {
    container: {
        margin: 20,
        padding: 10,
        width: 800,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        border: "10px rgb(50, 50, 50) outset"
    }
}