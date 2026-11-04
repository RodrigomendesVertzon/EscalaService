import 'dotenv/config';
import {z} from 'zod';
export const env=z.object({NODE_ENV:z.enum(['development','test','production']).default('development'),PORT:z.coerce.number().default(3004),DB_HOST:z.string().default('localhost'),DB_PORT:z.coerce.number().default(3306),DB_USER:z.string(),DB_PASSWORD:z.string(),DB_NAME:z.string().default('escala_service'),JWT_ACCESS_SECRET:z.string().min(32),JWT_ISSUER:z.string().default('auth-service'),JWT_AUDIENCE:z.string().default('platform-api'),LOG_LEVEL:z.string().default('info')}).parse(process.env);
