import React from "react";

interface InformativeBoxProps
{
    color:string;
    text:string;
    value:number|string;
}

export function InformativeBox(props:InformativeBoxProps)
{
    return (
        <div style={{borderColor: props.color, ...styles.container, color: "white"}}>
            <div style={{backgroundColor: props.color}}>
                <h5 style={styles.text}>{props.text}</h5>
            </div>
            <div style={styles.value}>
                {props.value}
            </div>
        </div>
    );
}

const styles = {
    container: {
        width: 100,
        borderWidth: 2,
        borderRadius: 5,
        borderStyle: "solid",
        textAlign: "center" as "center"
    },
    text: {
        margin: 0,
        padding: 5,
        borderRadius: 5
    },
    value: {
        textAlign: "center" as "center",
        color: "black"
    }
};