import { Socket } from "socket.io";
import { Game } from "./Game";
import { Role } from "./Role";

export class Player
{
    public hasPlayed = false;
    private readonly supplyStack = [Game.DEFAULT_STOCK, Game.DEFAULT_STOCK];
    private readonly history:number[] = [];
    private _stock = this.role === Role.SELLER ? 0 : Game.DEFAULT_STOCK;
    private _debt = 0;
    private _incoming = 0;

    constructor(public readonly socket:Socket, public readonly role:Role)
    {}

    public addToStack(qty:number)
    {
        this.supplyStack.push(qty);
    }
    public drain():number
    {
        const stock = this._stock;
        const supply = this.supplyStack.shift()!;

        this._stock -= supply;
        if (this._stock < 0) {
            this._debt += -this._stock;
            this._stock = 0;
            return (stock);
        }
        if (this._debt > 0) {
            this._debt -= this._stock;
            this._stock = 0;
        }
        else {
            this._stock += -this._debt;
            this._debt = 0;
        }
        return (supply);
    }
    public fill(qty:number):number
    {
        this._stock += qty;
        this._incoming = qty;
        this.history.push(this._stock);
        return (this._stock);
    }
    public play()
    {
        this.hasPlayed = false;
        this.socket.emit("play", {
            supply: this.supplyStack[0],
            stock: this._stock,
            debt: this._debt,
            incoming: this._incoming,
            history: this.history
        });
    }
}