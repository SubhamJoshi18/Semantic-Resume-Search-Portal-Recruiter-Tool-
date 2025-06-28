import dotenv from "dotenv";
dotenv.config();

const getEnvValue = (key: string): string | undefined => {
  let isEnvExists = false;
  if (Object.prototype.hasOwnProperty.call(process.env, key)) {
    isEnvExists = true;
  }
  return isEnvExists ? process.env[key] : undefined;
};

export { getEnvValue };
