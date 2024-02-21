import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {CustomerPoints} from "@shared/models/customer-points.model";
import {CustomerPointsService} from "@shared/services/customer-points.service";

@Component({
  selector: 'customer-points-menu-item',
  templateUrl: 'customer-points-menu-item.component.html'
})
export class CustomerPointsMenuItemComponent implements OnInit{
  customerPoints: Observable<CustomerPoints>;
  constructor(private customerPointsService: CustomerPointsService) {
  }

  ngOnInit(): void {
    this.customerPoints = this.customerPointsService.getCustomerPoints();
  }

}
