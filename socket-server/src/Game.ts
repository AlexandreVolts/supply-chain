import { Socket, Server } from "socket.io";
import { Player } from "./Player";
import { Role } from "./Role";
import { SupplyEngine } from "./SupplyEngine";

export class Game
{
    public static readonly DEFAULT_STOCK = 10;
    private readonly supplyEngine = new SupplyEngine();
    private readonly roles:Role[] = Object.values(Role).filter((r) => typeof r !== "string") as Role[];
    private readonly players:Player[] = new Array<Player>(this.roles.length);

    constructor(private readonly io:Server, private readonly roomId:string)
    {}

    private playTurn()
    {
        this.players[Role.INDUSTRIAL].fill(this.players[Role.INDUSTRIAL].wanted)
        this.players[Role.SELLER].supply = this.supplyEngine.generate();
        for (let i = 0; i <= Role.SELLER; i++) {
            if (i === 0)
                continue;
            this.players[i - 1].supply = this.players[i].wanted;
            this.players[i].fill(this.players[i - 1].drain(this.players[i - 1].supply));
        }
        this.players.forEach((p) => p.play());
    }
    private start()
    {
        for (const p of this.players) {
            p.socket.emit("start", {
                role: p.role
            });
            p.socket.on("supply", (data) => {
                const remaining = this.players.filter((p) => !p.hasPlayed).length;

                p.wanted = data.supply;
                p.hasPlayed = true;
                this.io.to(this.roomId).emit("played", {
                    role: p.role
                });
                if (remaining === 0) {
                    this.playTurn();
                }
            });
        }
        this.playTurn();
    }
    
    public add(socket:Socket)
    {
        let role;

        if (this.roles.length === 0)
            return;
        role = this.roles.splice(~~(Math.random() * this.roles.length), 1)[0];
        socket.join(this.roomId);
        this.players[role] = new Player(socket, role);
        this.players[role].wanted = Game.DEFAULT_STOCK;
        if (this.roles.length === 0)
            this.start();
    }
}