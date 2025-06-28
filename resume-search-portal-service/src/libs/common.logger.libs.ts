import winston from "winston";
const { combine, printf } = winston.format;

const myFormat = printf(({ level, message, service, batchId }) => {
  let jsonString = `{ "message": "${level === "error" ? message : message}"`;
  jsonString += `, "level": "${level}", "service": "${service}" }`;
  return jsonString;
});

function createLogger(service: string): winston.Logger {
  return winston.createLogger({
    levels: winston.config.syslog.levels,
    defaultMeta: {
      service,
    },
    format: combine(myFormat),
    transports: [new winston.transports.Console()],
  });
}

const resumeLogger = createLogger("resume-search-portal-service");

export { resumeLogger };
