import { Socket } from "socket.io";
import { Role } from "./Role";

export class Player
{
    public supply:number = 0;
    
    constructor(public readonly socket:Socket, public readonly role:Role)
    {
    }
}