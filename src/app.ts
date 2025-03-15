import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envsPlugins";
import { MongoDataBase } from "./data/mongo";
import { Server } from "./presentation/server";

( async () => {
    main();
})();

async function main() {

    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    })

    // const prisma = new PrismaClient()
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         message: 'Test Message',
    //         level: 'HIGH',
    //         origin: 'app.ts'
    //     }
    // })

    // console.log({newLog})

    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'MEDIUM'
    //     }
    // })
    // console.log({logs})

    Server.start()
}