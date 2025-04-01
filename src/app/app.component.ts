import { Component } from '@angular/core';
import { ComponentepaiComponent } from "./componentepai/componentepai.component";

@Component({
  selector: 'app-root',
  imports: [ComponentepaiComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Crud';
}
