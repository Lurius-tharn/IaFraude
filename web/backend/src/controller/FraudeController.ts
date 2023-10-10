import express, {NextFunction, Request, Response} from "express"
const sqlite3 = require("sqlite3");
var db = new sqlite3.Database('identifier.sqlite');
export class FraudeController {

	constructor () {
	}

	async testFraude(request: Request, response: Response, next: NextFunction) {

		db.serialize(function() {
			db.all("SELECT * FROM card_transdata LIMIT 1,100", function(err, rows) {
				if (err) {
					response.status(500).send("Erreur lors de l'exécution de la requête.");
				} else {
					response.json(rows);
				}
			});
		});
	}
}

