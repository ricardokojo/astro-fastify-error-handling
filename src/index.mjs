import Fastify from 'fastify';
import fastifyMiddie from '@fastify/middie';
import { handler as ssrHandler } from './dist/server/entry.mjs';

const app = Fastify({ logger: true });

app.register(fastifyMiddie);
app.use(ssrHandler);

app.listen({ port: 8080 });
