const winston = require("winston");
const chalk = require("chalk");
const { pad } = require(__dirname + "/../../utils.js");
const util = require("util");

class Logger {

    static get DEFAULT_OPTIONS() {
        return {};
    }

    static create(...args) {
        return new this(...args);
    }

    constructor(options = {}) {
        Object.assign(this, this.constructor.DEFAULT_OPTIONS, options);
        this.LOGGER_CLASS = this.constructor;
        this.LOGGER_INITIALIZATION_DATE = new Date();
        this.LOGGER_INFO = {
            FOR_CLASSES: {},
            FOR_INSTANCES: {},
            FOR_FUNCTIONS: {},
            FOR_METHODS: {},
            FOR_STATIC_METHODS: {},
        };
        const LOGGER_SETTINGS = {
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format((info) => {
                    info.timeware = (new Date() - this.LOGGER_INITIALIZATION_DATE) / 1000;
                    return info;
                })(),
                winston.format.simple(),
            ),
            transports: [
                new winston.transports.File({
                    filename: "error.log",
                    level: "error"
                }),
                new winston.transports.File({
                    filename: "debug.log",
                    level: "debug"
                }),
            ]
        };
        this.LOGGER_INSTANCE = winston.createLogger(LOGGER_SETTINGS);
        if (process.env.NODE_ENV !== "production") {
            this.LOGGER_INSTANCE.add(new winston.transports.Console({
                level: "silly",
                format: 
                    winston.format.printf((info, options) => {
                        const level = chalk.blue.bold.underline(info.level || "debug");
                        const timestamp = chalk.blue.bold(info.timestamp).replace("T", "@");
                        const timeware = chalk.yellow.bold(info.timeware);
                        const message = chalk.white(info.message);
                        const pretick = info.icon ? chalk.green.bold(info.icon) : chalk.green.bold("○");
                        return pretick + ` ${level} ${pad(10, timeware)} ${message}`;
                    })
            }));
        }
    }

    startsClass(id) {
        this.registerPoint(id, "class", "creation");
    }

    startsInstance(id) {
        this.registerPoint(id, "instance", "creation");
    }

    startsMethod(id) {
        this.registerPoint(id, "method", "creation");
    }

    startsStaticMethod(id) {
        this.registerPoint(id, "static", "creation");
    }

    startsFunction(id) {
        this.registerPoint(id, "function", "creation");
    }

    endsClass(id) {
        this.registerPoint(id, "class", "deletion");
    }

    endsInstance(id) {
        this.registerPoint(id, "instance", "deletion");
    }

    endsMethod(id) {
        this.registerPoint(id, "method", "deletion");
    }

    endsStaticMethod(id) {
        this.registerPoint(id, "static", "deletion");
    }

    endsFunction(id) {
        this.registerPoint(id, "function", "deletion");
    }

    log(msg, ...args) {
        return this.LOGGER_INSTANCE.log(typeof msg === "string" ? msg : util.inspect(msg), ...args);
    }
    info(msg, ...args) {
        return this.LOGGER_INSTANCE.info(typeof msg === "string" ? msg : util.inspect(msg), ...args);
    }
    verbose(msg, ...args) {
        return this.LOGGER_INSTANCE.verbose(typeof msg === "string" ? msg : util.inspect(msg), ...args);
    }
    silly(msg, ...args) {
        return this.LOGGER_INSTANCE.silly(typeof msg === "string" ? msg : util.inspect(msg), ...args);
    }
    warn(msg, ...args) {
        return this.LOGGER_INSTANCE.warn(typeof msg === "string" ? msg : util.inspect(msg), ...args);
    }
    error(msg, ...args) {
        return this.LOGGER_INSTANCE.error(typeof msg === "string" ? msg : util.inspect(msg), ...args);
    }
    debug(msg, ...args) {
        return this.LOGGER_INSTANCE.debug(typeof msg === "string" ? msg : util.inspect(msg), ...args);
    }
    registerPoint(id, idType, operation) {
        const idConstraint = (() => {
            if (idType === "class") {
                return "FOR_CLASSES"
            }
            if (idType === "instance") {
                return "FOR_INSTANCES"
            }
            if (idType === "function") {
                return "FOR_FUNCTIONS"
            }
            if (idType === "method") {
                return "FOR_METHODS"
            }
            if (idType === "static") {
                return "FOR_STATIC_METHODS"
            }
        })();
        if (!(id in this.LOGGER_INFO[idConstraint])) {
            this.LOGGER_INFO[idConstraint][id] = 0;
        }
        const isCreation = operation === "creation";
        this.LOGGER_INFO[idConstraint][id] += (isCreation ? 1 : -1);
        this.LOGGER_INSTANCE.debug("[auto]" + ` [${idType}@${id}] [x${this.LOGGER_INFO[idConstraint][id]}] [${operation}]`, {icon: isCreation ? "→" : "←" });
        /*
        this.LOGGER_INSTANCE.debug(chalk.red.bold(`
 ┌─${"─".repeat(id.length)}─┐
 │ ${id} │
 └─${"─".repeat(id.length)}─┘`) + chalk.yellow.bold(`
 ┌─────────────┐
 │  Operation: │ ${operation.toUpperCase()}
 │  Instances: │ ${this.LOGGER_INFO[idConstraint][id]}
 │       Type: │ class
 │ Identifier: │ ${id}
 └─────────────┘ 
 `));
        //*/
    }

    getAnalysis() {
        return this.LOGGER_INFO;
    }

    printAnalysis() {
        this.debug({
            status: this.LOGGER_INFO,
            memory: `${Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100} MB`
        });
    }
}

module.exports = Logger;