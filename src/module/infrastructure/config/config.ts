import dotenv from "dotenv";

dotenv.config();

export default {
  SERVER: {
    PORT: process.env.PORT || 3000,
  },
  CLOUD: {
    google: {
      projectId: process.env.GOOGLE_PROJECT_ID,
      credentialType: process.env.GOOGLE_CREDENTIALS_TYPE,
      privateKey: process.env.GOOGLE_PRIVATE_KEY,
      email: process.env.GOOGLE_EMAIL,
      clientId: process.env.GOOGLE_CLIENT_ID,
      topic: process.env.GOOGLE_TOPIC,
      subscription: process.env.GOOGLE_SUBSCRIPTION,
    },
  },
};
