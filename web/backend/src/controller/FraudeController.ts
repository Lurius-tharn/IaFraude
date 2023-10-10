import express, {NextFunction, Request, Response} from "express"
const sqlite3 = require("sqlite3");
// var db = new sqlite3.Database('../identifier/identifier.sqlite');
export class FraudeController {

	constructor () {
	}

	async testFraude(request: Request, response: Response, next: NextFunction) {
		return response.json("effe");


	}

	async getFraude(request: Request, response: Response, next: NextFunction) {



	}
}

