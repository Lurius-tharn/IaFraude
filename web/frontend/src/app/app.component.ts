import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import axios from 'axios';
interface Predict {
  distance_from_home:number
  distance_from_last_transaction    :number
  ratio_to_median_purchase_price    :number
  repeat_retailer    :number
  used_chip    :number
  online_order    :number

}

interface Capteur{
  ws:number,
  i:number,
  ta:number,
  tc:number

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

  capteur:Capteur = {

    ws: 0.0,
    tc: 0.0,
    ta: 0.0,
    i: 0.0,
  }

  isFraud:boolean = false
  constructor(private http: HttpClient) {}

  onSubmit() {
    const apiUrl = 'http://localhost:4547/capteur'; // Remplacez par votre URL API correcte
    axios.post(apiUrl, this.capteur).then(
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
