import * as express from 'express'
import {Routes} from "./src/routes/Routes";
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerJSDoc from 'swagger-jsdoc';
import bodyParser = require("body-parser");
import * as cors from "cors"
const PORT = 4547;


class App {


  public app: express.Application;
  public routePrv: Routes;
  public swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Documentation SWAGGER : API',
      version: '0.0.1',
    },
    servers: [
      {
        url: 'http://localhost:4547',
        description: 'Development server',
      },
    ],
  };

  private options = {
    swaggerDefinition: this.swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['**/routes/*.ts', '**/entity/*.ts',],
  };
  private swaggerSpec;


  constructor () {// initializing express in this application
    this.app = express ();// support application/json type post data
    this.app.use (bodyParser.json ());//support application/x-www-form-urlencoded post data
    this.app.use (bodyParser.urlencoded ({extended: false}));// for routing the http request to controller
    this.app.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', "true");
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    this.routePrv = new Routes ();
    this.swaggerSpec = swaggerJSDoc (this.options)
    this.routePrv.routes (this.app);
    this.app.use ('/docs', swaggerUi.serve, swaggerUi.setup (this.swaggerSpec));
    this.app.use(cors());
    this.app.listen (PORT, () => {
      console.info ('Express server listening on http://localhost:4547');
    });

  }
}


export default new App ().app;
