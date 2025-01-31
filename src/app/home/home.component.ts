import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { Housinglocation } from '../housinglocation';
import { HousingService } from '../housing.service';


@Component({
  selector: 'app-home',
  imports: [HousingLocationComponent],
  template: ` 
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter/>
        <button class="primary" type="button" (click)="filterResult(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      @for(housingLocation of filteredLocationList; track housingLocation.id)
      {
        <app-housing-location [housingLocation]="housingLocation"/>
      }
    </section>
  `,
  styleUrls:['./home.component.css']
})
export class HomeComponent {
  housingLocationList: Housinglocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: Housinglocation[]=[];

  constructor(){
    this.housingLocationList=this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }

  filterResult(text: string){
    if(!text){
      this.filteredLocationList=this.housingLocationList;
      return;
    }
    
    this.filteredLocationList=this.housingLocationList.filter((housingLocation)=>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    )

  }
}
