import { NgModule } from '@angular/core';

import { MatMenuModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatTableModule,
        MatSidenavModule,
        MatDividerModule,
        MatChipsModule,
        MatDialogModule,
        MatCheckboxModule } from '@angular/material';

@NgModule({
    imports: [
        MatMenuModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatTableModule,
        MatSidenavModule,
        MatDividerModule,
        MatChipsModule,
        MatDialogModule,
        MatCheckboxModule
    ],
    exports: [
        MatMenuModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatTableModule,
        MatSidenavModule,
        MatDividerModule,
        MatChipsModule,
        MatDialogModule,
        MatCheckboxModule
    ]
})

export class MaterialModule {}