import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';

import { AppComponent } from './app.component';
import { SipCalculatorComponent } from './features/sip-calculator/sip-calculator.component';
import { LumpsumCalculatorComponent } from './features/lumpsum-calculator/lumpsum-calculator.component';
import { ComparisonComponent } from './features/comparison/comparison.component';
import { InflationComponent } from './features/inflation/inflation.component';
import { AboutComponent } from './features/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    SipCalculatorComponent,
    LumpsumCalculatorComponent,
    ComparisonComponent,
    InflationComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}