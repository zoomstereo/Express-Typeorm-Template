import { createConnection, getConnection } from "typeorm";

const connection = {
    async create(testConnection: boolean) {
        let entitiesPath = testConnection ? "entity/**/*.entity.ts" : "dist/**/*.entity.js"

        await createConnection({
            type: "postgres",
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || "5433"),
            username: process.env.DB_USERNAME,
            password: process.env.PASSWORD,
            database: process.env.DATABASE_NAME,
            synchronize: true,
            logging: false,
            entities: [
                entitiesPath
            ],
            migrations: [
                "migration/*.ts"
            ],
            subscribers: [
                "subscriber/*.ts"
            ]
        });
    },

    async close() {
        await getConnection().close();
    }
}

export { connection };