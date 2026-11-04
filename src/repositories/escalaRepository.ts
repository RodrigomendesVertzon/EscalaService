import {randomUUID} from 'crypto';
import {PoolConnection,ResultSetHeader,RowDataPacket} from 'mysql2/promise';
import {db} from '../config/db';
export async function one<T extends RowDataPacket>(sql:string,args:unknown[]=[]):Promise<T|null>{const [rows]=await db.execute<T[]>(sql,args);return rows[0]??null;}
export async function many<T extends RowDataPacket>(sql:string,args:unknown[]=[]):Promise<T[]>{const [rows]=await db.execute<T[]>(sql,args);return rows;}
export async function tx<T>(fn:(c:PoolConnection)=>Promise<T>):Promise<T>{const c=await db.getConnection();try{await c.beginTransaction();const value=await fn(c);await c.commit();return value;}catch(e){await c.rollback();throw e;}finally{c.release();}}
export async function insert(c:PoolConnection,sql:string,args:unknown[]):Promise<number>{const [r]=await c.execute<ResultSetHeader>(sql,args);return r.insertId;}
export async function event(c:PoolConnection,type:string,aggregate:string,aggregateId:number,payload:unknown){await c.execute('INSERT INTO outbox_event(event_id,aggregate_type,aggregate_id,event_type,payload) VALUES(?,?,?,?,?)',[randomUUID(),aggregate,aggregateId,type,JSON.stringify(payload)]);}
export async function audit(c:PoolConnection,entity:string,entityId:number,action:string,actor:number,correlationId:string|undefined,data:unknown){await c.execute('INSERT INTO auditoria(entidade,entidade_id,acao,actor_auth_user_id,correlation_id,dados) VALUES(?,?,?,?,?,?)',[entity,entityId,action,actor,correlationId||null,JSON.stringify(data)]);}
