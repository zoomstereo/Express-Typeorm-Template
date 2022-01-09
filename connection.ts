import { createConnection, getConnection } from "typeorm";

const connection = {
    async create() {
        await createConnection();
        console.log("Connected to the db");
    },

    async createTestConnection() {
        await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5433,
            username: "",
            password: "",
            database: "",
            synchronize: true,
            logging: false,
            entities: [
                "entity/**/*.entity.ts"
            ],
            migrations: [
                "migration/*.ts"
            ],
            subscribers: [
                "subscriber/*.ts"
            ]
        });
        console.log("Connected to the TEST db");
    },

    async close() {
        await getConnection().close();
    }
}

export { connection };