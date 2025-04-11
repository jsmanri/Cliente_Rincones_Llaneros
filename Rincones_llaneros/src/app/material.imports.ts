import { importProvidersFrom } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatCardModule } from "@angular/material/card"
import { MatIconModule } from "@angular/material/icon"

export const materialProviders = importProvidersFrom (
    
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatInputModule,
    MatCardModule,
    MatIconModule
)