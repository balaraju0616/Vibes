import ImageKit from "imagekit";

let imagekit;

try {
  if (process.env.IMAGEKIT_PUBLIC_KEY && process.env.IMAGEKIT_PRIVATE_KEY && process.env.IMAGEKIT_URL_ENDPOINT) {
    imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
    });
    console.log('ImageKit initialized successfully');
  } else {
    console.warn('ImageKit environment variables missing - ImageKit will not work');
    // Create a mock imagekit object to prevent crashes
    imagekit = {
      upload: () => Promise.reject(new Error('ImageKit not configured')),
      url: () => '#'
    };
  }
} catch (error) {
  console.error('ImageKit initialization failed:', error.message);
  // Create a mock to prevent crashes
  imagekit = {
    upload: () => Promise.reject(new Error('ImageKit not configured')),
    url: () => '#'
  };
}

export default imagekit;