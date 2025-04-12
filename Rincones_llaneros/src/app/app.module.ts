import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RegistroModule } from './pages/componenteturismo/registro/registro.module';  // Importa el RegistroModule

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RegistroModule],  // Agrega el RegistroModule en los imports
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
