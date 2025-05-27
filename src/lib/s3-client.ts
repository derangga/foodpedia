import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { env } from "./environment";

const s3Client = new S3Client({
  region: "apac",
  endpoint: env.R2_S3_ENDPOINT,
  credentials: {
    accessKeyId: env.R2_ACCESS_ID,
    secretAccessKey: env.R2_CLIENT_SECRET_KEY,
  },
});

export async function uploadImage({
  key,
  folder,
  body,
}: {
  key: string;
  folder: string;
  body: File;
}) {
  try {
    const arrayBuffer = await body.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const command = new PutObjectCommand({
      Bucket: env.R2_BUCKET_NAME,
      Key: `${folder}/${key}`,
      Body: buffer,
      ContentType: body.type,
    });

    const fileUpload = await s3Client.send(command);
    return fileUpload;
  } catch (error) {
    console.error(`uploadImage [ERROR]: ${error}`);
    return null;
  }
}
