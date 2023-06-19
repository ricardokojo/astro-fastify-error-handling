import Fastify from 'fastify';
import fastifyMiddie from '@fastify/middie';
import { handler as ssrHandler } from '../dist/server/entry.mjs';
import page500 from './500.mjs';

const app = Fastify({ logger: {
    file: 'logs.log',
    level: 'warn',
} });

app.setErrorHandler(async (error, request, reply) => {
	if (reply.statusCode >= 400 && reply.statusCode < 500) {
		app.log.warn(error, 'Warning!');
		await reply
			.status(reply.statusCode)
			.type('text/plain')
			.send(`Warning ${reply.statusCode} ${request.url}`);
	} else {
		app.log.error(error, 'Error!');
		await reply.status(500).type('text/html').send(page500);
	}
});

await app.register(fastifyMiddie);
app.use(ssrHandler);

app.listen({ port: 8080 });
