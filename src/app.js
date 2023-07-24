import Client from "./client";

const totalClients = 2;
for (let index = 0; index < totalClients; index++) {
    const client = new Client();
    client.init();
}
