import { createServer } from 'node:http';
import { existsSync, statSync, createReadStream } from 'node:fs';
import { resolve, join, extname } from 'node:path';
import { exec } from 'node:child_process';

const PORT = 8080;
const root = resolve('.');
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = createServer((req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname === '/') pathname = '/index.html';
    const filePath = resolve(join(root, pathname));
    if (!filePath.startsWith(root)) {
      res.writeHead(403);
      return res.end('Acesso negado');
    }
    if (existsSync(filePath) && statSync(filePath).isFile()) {
      const ext = extname(filePath).toLowerCase();
      res.writeHead(200, {
        'Content-Type': MIME[ext] || 'application/octet-stream',
        'Cache-Control': 'no-cache'
      });
      createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Arquivo não encontrado');
    }
  } catch (err) {
    res.writeHead(500);
    res.end('Erro interno do servidor');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\n======================================================`);
  console.log(`Site: Rosalinda Khal e João Luiz Filho — Advocacia`);
  console.log(`Servidor local ativo em: ${url}`);
  console.log(`======================================================\n`);
  exec(`start ${url}`);
});
