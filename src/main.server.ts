import { enableProdMode } from '@angular/core';
import { platformServer } from '@angular/platform-server';
import { AppModule } from './app/app.module'; // Importa el módulo específico del servidor

enableProdMode();

const bootstrap = () => platformServer().bootstrapModule(AppModule);

export default bootstrap;
