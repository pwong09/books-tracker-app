"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const express = require("express");
const SearchBar_1 = require("./components/search-bar/SearchBar");
class App {
    constructor() {
        this.express = express();
        this.mountRoutes();
    }
    mountRoutes() {
        const router = express.Router();
        router.get('/', (req, res) => {
            res.json({
                message: 'Hello World!'
            });
        });
        this.express.use('/', router);
    }
    render() {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(SearchBar_1.default, null)));
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map