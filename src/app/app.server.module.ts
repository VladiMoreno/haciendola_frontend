import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module'; // Importa el módulo principal de la aplicación
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    ServerModule,
    AppModule // Importa el módulo principal de la aplicación
  ],
  bootstrap: [AppComponent] // Componente raíz de la aplicación
})
export class AppServerModule {}
