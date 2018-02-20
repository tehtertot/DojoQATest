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
         MatTabsModule,
        MatSidenavModule,
    MatDividerModule } from '@angular/material';

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
        MatTabsModule,
        MatSidenavModule,
        MatDividerModule
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
        MatTabsModule,
        MatSidenavModule,
        MatDividerModule
    ]
})

export class MaterialModule {}