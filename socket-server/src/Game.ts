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
    private readonly bank:number[] = [Game.DEFAULT_STOCK];

    constructor(private readonly io:Server, private readonly roomId:string)
    {}

    private manageAscendingSupply()
    {
        this.players[Role.INDUSTRIAL].fill(this.bank.shift()!);
        this.players[Role.SELLER].addToStack(this.supplyEngine.generate());
        for (let i = 0; i <= Role.SELLER; i++) {
            if (i === 0)
                continue;
            this.players[i].fill(this.players[i - 1].drain());
        }
        this.players.forEach((p) => p.play());
    }
    private manageDescendingSupply = (data:any) =>
    {
        const remaining = this.players.filter((p) => !p.hasPlayed).length;

        if (p.hasPlayed)
            return;
        if (p.role > 0)
            this.players[p.role - 1].addToStack(data.supply);
        else
            this.bank.push(data.supply);
        p.hasPlayed = true;
        this.io.to(this.roomId).emit("played", { role: p.role });
        if (remaining === 0) {
            this.manageAscendingSupply();
        }
    }
    private start()
    {
        for (const p of this.players) {
            p.socket.emit("start", { role: p.role });
            p.socket.on("supply", this.manageDescendingSupply);
        }
        this.manageAscendingSupply();
    }
    
    public add(socket:Socket)
    {
        let role;

        if (this.roles.length === 0)
            return;
        role = this.roles.splice(~~(Math.random() * this.roles.length), 1)[0];
        socket.join(this.roomId);
        this.players[role] = new Player(socket, role);
        if (this.roles.length === 0)
            this.start();
    }
}