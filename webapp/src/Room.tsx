import React from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { Interface } from "./Interface";

const URL = process.env.REACT_APP_SOCKET_SERVER_URL || "http://localhost:8888";
const socket = io(URL);

export function Room()
{
    const { id } = useParams<{id:string}>();
    const [ role, setRole ] = React.useState(-1);

    React.useEffect(() => {
        socket.emit("room", {room: id});
        socket.on("start", (data:{role:number}) => {
            setRole(data.role);
        });
        return (() => { socket.disconnect(); });
    }, [ id ]);

    return (
        <>
            {role === -1 && <p>Waiting for players...</p>}
            {<Interface role={role} />}
        </>
    );
}