import express, {NextFunction, Request, Response} from "express"

import axios from "axios"

interface Predict {
	wind_speed : number
	ta: number
	tc : number
	I : number

}

export class EcologieController {

	constructor () {
	}

	async testEcologie(request: Request, response: Response, next: NextFunction) {
		return response.json("effe");


	}

	async getEcologie(request: Request, response: Response, next: NextFunction) {
		const predict : Predict = request.body
		axios.post("http://127.0.0.1:8000/predict/",predict)
			.then(data => {
				response.json (data.data)
			})
			.catch(err => next(err));

	}
}

