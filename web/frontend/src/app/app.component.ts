import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import axios from 'axios';
interface Predict {
  distance_from_home:number
  distance_from_last_transaction    :number
  ratio_to_median_purchase_price    :number
  repeat_retailer    :any
  used_chip    :any
  online_order    :any

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

  isFraud:boolean = false
  constructor(private http: HttpClient) {}

  onSubmit() {
    const apiUrl = 'http://localhost:4547/predict'; // Remplacez par votre URL API correcte
    console.log(this.predict)
    this.predict.used_chip = this.predict.used_chip == true ? 1 : 0
    this.predict.online_order = this.predict.online_order == true ? 1 : 0
    this.predict.repeat_retailer = this.predict.repeat_retailer == true ? 1 : 0
    console.log(this.predict)
    axios.post(apiUrl, this.predict).then(
      (response) => {
        this.isFraud = response.data.prediction == 1
        console.log('Réponse de l\'API :', response.data.prediction);
      },
      (error) => {
        console.error('Erreur lors de la requête POST :', error);
      }
    );
  }


}
