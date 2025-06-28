import { CLEAR_S3_BUCKET_FLAG } from "../constant/common.constant";

function terminateServer() {
  process.exit(1);
}

function checkFlagPromise(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (CLEAR_S3_BUCKET_FLAG) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
}

export { terminateServer, checkFlagPromise };
