import 'dotenv/config';

module.exports = {
  expo: {
    scheme: 'acme',
    web: {
      bundler: 'metro'
    },
    name: 'Hirehub',
    slug: 'Hirehub',
    plugins: [
      [
        'expo-image-picker',
        {
          photosPermission: 'Allow $(PRODUCT_NAME) to access your photos',
          cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera'
        }
      ]
    ],
    extra: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID
    }
  }
}

