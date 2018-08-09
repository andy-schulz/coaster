import { configure, getLogger } from 'log4js';
configure('./config/log4js.json');
import { SwaggerAPITester } from './SwaggerAPITester';
import { SwaggerRunner} from "./openAPI/SwaggerRunner";


//let sw = new SwaggerAPITester('./swagger.yaml');
const logger = getLogger("out");
logger.info(`Start Test Execution`);
// const filePath: string =  `${__dirname}/../res/pi.yaml`;
// const filePath: string =  `${__dirname}/../res/swagger.yaml`;
const filePath: string =  `${__dirname}/../../res/openapi.yaml`;

logger.debug(`reading file from ${filePath}`);

// let sw = new SwaggerAPITester(filePath);


this.swaggerRunner = new SwaggerRunner(filePath);

// call to execute Tests

// sw.Execute().then(() => {
//    logger.debug(`Print Total Results.`);
//    sw.printTotalResult();
// });



//Vorschläge:
//1. Authentifizierungsinformationen innerhalb von dem Swagger-File bereitstellen.
//2. Body-Jsons als DataFile bereitstellen und diese aus den Examples verlinken
//3. Body Validierung mit Hilfe von Definitions Regions
