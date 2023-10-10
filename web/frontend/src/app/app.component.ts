import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface Predict {
  distance_from_home:number
  distance_from_last_transaction    :number
  ratio_to_median_purchase_price    :number
  repeat_retailer    :number
  used_chip    :number
  online_order    :number

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  predict: Predict = {
    distance_from_home: 0.0,
    distance_from_last_transaction: 0.0,
    ratio_to_median_purchase_price: 0.0,
    repeat_retailer: 0.0,
    used_chip: 0.0,
    online_order: 0.0
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    const apiUrl = 'http://localhost:4547/predict'; // Remplacez par votre URL API correcte
    this.http.post(apiUrl, this.predict).subscribe(
      (response) => {
        console.log('Réponse de l\'API :', response);
      },
      (error) => {
        console.error('Erreur lors de la requête POST :', error);
      }
    );
  }


}
