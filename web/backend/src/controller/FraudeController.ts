import express, {NextFunction, Request, Response} from "express"

import axios from "axios"

interface Predict {
	distance_from_home:number
	distance_from_last_transaction    :number
	ratio_to_median_purchase_price    :number
	repeat_retailer    :number
	used_chip    :number
	online_order    :number

}

export class FraudeController {

	constructor () {
	}

	async testFraude(request: Request, response: Response, next: NextFunction) {
		return response.json("effe");


	}

	async getFraude(request: Request, response: Response, next: NextFunction) {
		const predict : Predict = request.body
		axios.post("http://127.0.0.1:8000/predict/",predict)
			.then(data => response.json(data.data.message))
			.catch(err => next(err));

	}
}

