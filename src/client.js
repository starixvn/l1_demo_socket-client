import io from "socket.io-client";

export default class Client {
    constructor() {
        this.serverName = "";
    }

    init() {
        const url = "wss://l1-proxy1.lumigame.com/";
        const socket = io.connect(url, {
            forceNew: true,
            transports: ["websocket"],
            upgrade: false,
            path: "/multisocket/socket.io",
        });

        socket.on("connect", () => {
            console.log("connected");
        });

        socket.on("ping", (data) => {
            // console.log(data);

            if (data.serverName) {
                this.serverName = data.serverName;
                console.log(`Server ${data.serverName}. SocketId: ${data.socketId}`);
            }

            if (data.now) {
                console.log(`Received ${data.now} from Server ${this.serverName}`);
            }
        });

        socket.on("connect_error", (error) => console.log("error: ", error));

        socket.on("disconnected", () => {
            console.log(`Disconnected ${this.serverName}`);
        });
    }
}
