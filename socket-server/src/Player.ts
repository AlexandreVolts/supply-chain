import { Socket } from "socket.io";
import { Game } from "./Game";
import { Role } from "./Role";

export class Player
{
    public supply = 0;
    public wanted = 0;
    public hasPlayed = false;
    private _stock = Game.DEFAULT_STOCK;
    private _debt = 0;

    constructor(public readonly socket:Socket, public readonly role:Role)
    {}

    public drain(qty:number):number
    {
        const stock = this._stock;

        this._stock -= qty;
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
        return (qty);
    }
    public fill(qty:number):number
    {
        this._stock += qty;
        return (this._stock);
    }
    public play()
    {
        this.wanted = 0;
        this.hasPlayed = false;
        this.socket.emit("play", {
            supply: this.supply,
            stock: this._stock,
            debt: this._debt
        });
    }
}