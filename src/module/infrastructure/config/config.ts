import dotenv from "dotenv";

dotenv.config();

export default {
  SERVER: {
    PORT: process.env.PORT || 3000,
  },
  CLOUD: {
    google: {
      projectId: process.env.GOOGLE_PROJECT_ID,
      keyFilename: process.env.GOOGLE_KEY_FILENAME,
      key: process.env.GOOGLE_PRIVATE_KEY,
      email: process.env.GOOGLE_CLIENT_EMAIL,
      topic: process.env.GOOGLE_TOPIC,
      subscription: process.env.GOOGLE_SUBSCRIPTION,
    },
  },
};
