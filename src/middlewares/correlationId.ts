import {randomUUID} from 'crypto';
import {RequestHandler} from 'express';
export const correlationId:RequestHandler=(req,res,next)=>{req.correlationId=String(req.header('X-Correlation-Id')||randomUUID()).slice(0,100);res.setHeader('X-Correlation-Id',req.correlationId);next();};
