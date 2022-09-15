import { PrismaClient } from '@prisma/client';


export const handle = async ({event, resolve}) => {
    const prisma = new PrismaClient();
  
    event.locals = {
        prisma: prisma
    };
    const response = await resolve(event);
    return response;
  };