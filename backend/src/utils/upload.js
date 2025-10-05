import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'hackverse_avatars',
    format: async (req, file) => 'png', // supports promises as well
    public_id: (req, file) => `avatar-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // Use timestamp + random for public_id
  },
});

const upload = multer({ storage: storage });

export default upload;
