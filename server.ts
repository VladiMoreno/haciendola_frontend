import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { ApplicationRef } from '@angular/core'; // Importa ApplicationRef
import { first } from 'rxjs/operators'; // Importa first operator de rxjs
import { AppServerModule } from './src/app/app.server.module';
import { platformServer } from '@angular/platform-server';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    platformServer().bootstrapModule(AppServerModule).then(moduleRef => {
      const applicationRef = moduleRef.injector.get(ApplicationRef);
      applicationRef.isStable.pipe(
        first((isStable: boolean) => isStable === true) // Corrige error de tipado
      ).subscribe(() => {
        commonEngine
          .render({
            //bootstrap: () => Promise.resolve(moduleRef),
            documentFilePath: indexHtml,
            url: `${protocol}://${headers.host}${originalUrl}`,
            publicPath: browserDistFolder,
            providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
          })
          .then((html) => res.send(html))
          .catch((err) => next(err));
      });
    });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
