import { Socket } from "socket.io";
import { Player } from "./Player";
import { Role } from "./Role";
import { SupplyEngine } from "./SupplyEngine";

export class Game
{
    private readonly supplyEngine = new SupplyEngine();
    private readonly roles:Role[] = Object.values(Role).filter((r) => typeof r !== "string") as Role[];
    private readonly players:Player[] = [];

    constructor(public readonly roomId:string)
    {}

    public add(socket:Socket)
    {
        let role;

        if (this.roles.length === 0)
            return;
        role = this.roles.splice(~~(Math.random() * this.roles.length), 1)[0];
        socket.join(this.roomId);
        this.players.push(new Player(socket, role));
        if (this.roles.length === 0)
            this.start();
    }
    public start()
    {
        for (const p of this.players) {
            p.socket.emit("start", {
                role: p.role
            });
        }
    }
}