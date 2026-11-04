import {z} from 'zod';
export const id=z.coerce.number().int().positive();
export const turnoSchema=z.object({empresaId:id,unidadeId:id,setorId:id,nome:z.string().min(2).max(150),inicio:z.string().datetime({offset:true}),fim:z.string().datetime({offset:true})}).refine(x=>Date.parse(x.fim)>Date.parse(x.inicio),{message:'fim deve ser posterior a inicio'});
export const vagaSchema=z.object({funcao:z.string().min(2).max(100),quantidade:z.number().int().min(1).max(10000),modalidade:z.enum(['HORA','TURNO']),valorBase:z.number().nonnegative(),adicionalNoturno:z.number().nonnegative().default(0)});
export const candidaturaSchema=z.object({freelancerId:id});
export const alocacaoSchema=z.object({freelancerId:id});
export const statusAceiteSchema=z.object({aceitar:z.boolean()});
export const bonusSchema=z.discriminatedUnion('tipo',[z.object({tipo:z.literal('COLETIVO'),vagaId:id,valor:z.number().nonnegative(),condicaoTodosPresentes:z.boolean().default(true),descricao:z.string().max(300).optional()}),z.object({tipo:z.literal('INDIVIDUAL'),alocacaoId:id,valor:z.number().nonnegative(),descricao:z.string().max(300).optional()})]);
export const alteracaoSchema=z.object({campo:z.string().min(2).max(100),novo:z.unknown(),motivo:z.string().min(5).max(500)});
