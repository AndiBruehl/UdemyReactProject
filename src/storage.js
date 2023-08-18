
const {Storage} = require('@google-cloud/storage');

const storage = new Storage();

async function createBucket() {

  await storage.createBucket(bucketName);
  console.log(`Bucket ${bucketName} created.`);
}

createBucket().catch(console.error); 