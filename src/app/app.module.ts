import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { 
  MatDatepickerModule, MatNativeDateModule, MatFormFieldModule,
  MatInputModule, MatButtonModule, MatDialogModule, MatOptionModule,
  MatTabsModule  
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { GamesReorganizingComponent } from './games/games-reorganizing/games-reorganizing.component';
import { GameDetailComponent } from './games/game-detail/game-detail.component';
import { GameDetailReorganizingComponent } from './games/game-detail/game-detail-reorganizing/game-detail-reorganizing.component';

import { GamesService } from './services/games.service';
import { GameService } from './services/game.service';

const appRoutes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    GamesReorganizingComponent,
    GameDetailComponent,
    GameDetailReorganizingComponent
  ],
  entryComponents: [
    GameDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, 
    MatDialogModule,
    MatTabsModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [GamesService, GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
