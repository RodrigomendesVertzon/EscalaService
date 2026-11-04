import {RequestHandler} from 'express';
import jwt,{JwtPayload} from 'jsonwebtoken';
import {env} from '../config/env';
import {AppError} from '../utils/AppError';
export const authenticate:RequestHandler=(req,_res,next)=>{try {const m=/^Bearer (.+)$/i.exec(req.headers.authorization||'');if(!m)throw new AppError(401,'TOKEN_AUSENTE','Token ausente');const p=jwt.verify(m[1],env.JWT_ACCESS_SECRET,{algorithms:['HS256'],issuer:env.JWT_ISSUER,audience:env.JWT_AUDIENCE}) as JwtPayload;if(p.type!=='access'||!p.sub||typeof p.role!=='string')throw new AppError(401,'TOKEN_INVALIDO','Token inválido');req.auth={userId:Number(p.sub),role:p.role,email:typeof p.email==='string'?p.email:undefined};next();}catch(e){next(e instanceof AppError?e:new AppError(401,'TOKEN_INVALIDO','Token inválido ou expirado'));}};
export const requireRoles=(...roles:string[]):RequestHandler=>(req,_res,next)=>req.auth&&roles.includes(req.auth.role)?next():next(new AppError(403,'ACESSO_NEGADO','Permissão insuficiente'));
