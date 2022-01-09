"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const winston = __importStar(require("winston"));
const expressWinston = __importStar(require("express-winston"));
const cors_1 = __importDefault(require("cors"));
const users_routes_config_1 = require("./users/users.routes.config");
const auth_routes_config_1 = require("./auth/auth.routes.config");
const debug_1 = __importDefault(require("debug"));
class ServerSetup {
    constructor() {
        this.app = (0, express_1.default)();
        this.server = http.createServer(this.app);
        this.port = 3001;
        this.routes = [];
        this.debugLog = (0, debug_1.default)('app');
        this.runningMessage = `Server running at http://localhost:${this.port}`;
        this.setUpServer = () => {
            // here we are adding middleware to parse all incoming requests as JSON 
            this.app.use(express_1.default.json());
            // here we are adding middleware to allow cross-origin requests
            this.app.use((0, cors_1.default)());
            // here we are preparing the expressWinston logging middleware configuration,
            // which will automatically log all HTTP requests handled by Express.js
            const loggerOptions = {
                transports: [new winston.transports.Console()],
                format: winston.format.combine(winston.format.json(), winston.format.prettyPrint(), winston.format.colorize({ all: true })),
            };
            if (!process.env.DEBUG) {
                loggerOptions.meta = false; // when not debugging, log requests as one-liners
                if (typeof global.it === 'function') {
                    loggerOptions.level = 'http'; // for non-debug test runs, squelch entirely
                }
            }
            // initialize the logger with the above configuration
            this.app.use(expressWinston.logger(loggerOptions));
            // here we are adding the UserRoutes to our array,
            // after sending the Express.js application object to have the routes added to our app!    
            this.routes.push(new auth_routes_config_1.AuthRoutes(this.app));
            this.routes.push(new users_routes_config_1.UsersRoutes(this.app));
            this.app.get('/', (req, res) => {
                res.status(200).send(this.runningMessage);
            });
            return this.server;
        };
    }
    listen() {
        this.setUpServer();
        this.server.listen(this.port, () => {
            this.routes.forEach((route) => {
                this.debugLog(`Routes configured for ${route.getName()}`);
            });
            console.log(this.runningMessage);
        });
    }
}
exports.default = ServerSetup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRCQUEwQjtBQUMxQixzREFBOEI7QUFDOUIsMkNBQTZCO0FBQzdCLGlEQUFtQztBQUNuQyxnRUFBa0Q7QUFDbEQsZ0RBQXdCO0FBR3hCLHFFQUEwRDtBQUMxRCxrRUFBdUQ7QUFDdkQsa0RBQTBCO0FBRTFCLE1BQXFCLFdBQVc7SUFBaEM7UUFDSSxRQUFHLEdBQXdCLElBQUEsaUJBQU8sR0FBRSxDQUFDO1FBQ3JDLFdBQU0sR0FBZ0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEQsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFdBQU0sR0FBOEIsRUFBRSxDQUFDO1FBQ3ZDLGFBQVEsR0FBb0IsSUFBQSxlQUFLLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsbUJBQWMsR0FBRyxzQ0FBc0MsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRW5FLGdCQUFXLEdBQUcsR0FBRyxFQUFFO1lBQ2Ysd0VBQXdFO1lBQ3hFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUU3QiwrREFBK0Q7WUFDL0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSxjQUFJLEdBQUUsQ0FBQyxDQUFDO1lBRXJCLDZFQUE2RTtZQUM3RSx1RUFBdUU7WUFDdkUsTUFBTSxhQUFhLEdBQWlDO2dCQUNoRCxVQUFVLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzlDLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FDMUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFDckIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFDNUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FDekM7YUFDSixDQUFDO1lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFO2dCQUNwQixhQUFhLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLGlEQUFpRDtnQkFDN0UsSUFBSSxPQUFPLE1BQU0sQ0FBQyxFQUFFLEtBQUssVUFBVSxFQUFFO29CQUNqQyxhQUFhLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLDRDQUE0QztpQkFDN0U7YUFDSjtZQUVELHFEQUFxRDtZQUNyRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFFbkQsa0RBQWtEO1lBQ2xELDJGQUEyRjtZQUMzRixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLCtCQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxpQ0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRzVDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxFQUFFO2dCQUM5RCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7WUFDN0MsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQyxDQUFBO0lBWUwsQ0FBQztJQVZHLE1BQU07UUFDRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUF5QixFQUFFLEVBQUU7Z0JBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMseUJBQXlCLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDOUQsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQTNERCw4QkEyREMifQ==