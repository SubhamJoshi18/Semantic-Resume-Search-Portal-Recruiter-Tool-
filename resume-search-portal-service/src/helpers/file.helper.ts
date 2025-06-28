import fs from "fs";
import path from "path";
import { resumeLogger } from "../libs/common.logger.libs";

async function clearS3Bucket() {
  return new Promise((resolve, reject) => {
    const s3BucketPath = path.join(process.cwd(), "uploads");
    if (fs.existsSync(s3BucketPath)) {
      fs.rm(s3BucketPath, { recursive: true, force: true }, (err) => {
        if (err) {
          resumeLogger.error(
            `Error Clearing all the Resume from the S3 Buckets`
          );
          process.exit(1);
        } else {
          resolve(true);
        }
      });
    }
  });
}

export default clearS3Bucket;
