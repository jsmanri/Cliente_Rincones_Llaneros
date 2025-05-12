import { importProvidersFrom } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatToolbarModule} from '@angular/material/toolbar'
import { MatCardModule } from "@angular/material/card"
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from "@angular/material/icon"

export const materialProviders = importProvidersFrom (
    
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule

)