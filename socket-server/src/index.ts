import io from "socket.io";
import { Game } from "./Game";

async function main():Promise<void>
{
    const ss = new io.Server(parseInt(process.env.PORT || "8888"), {
        cors: {
            origin: "url.com",
            methods: ["GET", "POST"]
        }
    });
    const games = new Map<string, Game>();

    ss.on("connection", (socket) => {
        socket.on("room", (data:{room:string}) => {
            const game = games.get(data.room);
            
            if (!data?.room)
                return;
            if (!game)
                games.set(data.room, new Game(ss, data.room));
            games.get(data.room)!.add(socket);
        });
    });
}

main().catch((err:Error) => {
    console.log(err.stack);
    process.exit(1);
});
