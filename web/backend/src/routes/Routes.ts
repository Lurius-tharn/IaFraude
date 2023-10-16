import {NextFunction, Request, Response} from "express";
import {EcologieController} from "../controller/EcologieController";


export class Routes {


	private EcologieController : EcologieController
	constructor () {
		this.EcologieController = new EcologieController()
	}

	public routes(app) : void{
		app.route('/')
			.get((request: Request, response: Response) => {
				response.status(200)
					.send({
						message: "GET request successfully."
					});
			});
		app.route("/ecologie").get((request: Request, response: Response, next: NextFunction) => this.EcologieController.testEcologie(request, response, next));


		app.route("/temperature").post((request: Request, response: Response, next: NextFunction) => this.EcologieController.getTemperature(request, response, next));

	}


}


