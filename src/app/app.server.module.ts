import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [AppModule, ServerModule, AppRoutingModule],
})
export class AppServerModule {}
