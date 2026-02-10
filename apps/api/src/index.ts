import Fastify from 'fastify';
import type { HealthResponse } from '@cellarsync/shared';

const server = Fastify({ logger: true });

const PORT = Number(process.env['PORT'] ?? 3001);
const HOST = process.env['HOST'] ?? '0.0.0.0';

server.get<{ Reply: HealthResponse }>('/api/health', () => {
  return { status: 'ok' as const };
});

try {
  await server.listen({ port: PORT, host: HOST });
  server.log.info(`Server listening on ${HOST}:${PORT}`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
