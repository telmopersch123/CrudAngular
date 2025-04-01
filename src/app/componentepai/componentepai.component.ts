import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponenteSuccessComponent } from "../componente-success/componente-success.component";
import { ComponentecaderrorComponent } from "../componentecaderror/componentecaderror.component";
import { ComponenteloginregistrarComponent } from "../componenteloginregistrar/componenteloginregistrar.component";

@Component({
  selector: 'app-componentepai',
  imports: [ComponenteSuccessComponent, RouterModule, ComponenteloginregistrarComponent, ComponentecaderrorComponent],
  templateUrl: './componentepai.component.html',
  styleUrl: './componentepai.component.css'
})
export class ComponentepaiComponent {

}
