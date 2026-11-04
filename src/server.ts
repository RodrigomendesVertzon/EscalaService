import {app} from './app';
import {env} from './config/env';
import {logger} from './config/logger';
import {db} from './config/db';
const server=app.listen(env.PORT,()=>logger.info({port:env.PORT},'escala-service started'));
const shutdown=async()=>{server.close(async()=>{await db.end();process.exit(0);});setTimeout(()=>process.exit(1),10000).unref();};
process.on('SIGTERM',shutdown);process.on('SIGINT',shutdown);
