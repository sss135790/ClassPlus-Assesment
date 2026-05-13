import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { connectDB } from './src/db';

const app = express();
const PORT = process.env.PORT || 5000;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer - memory storage, no local disk writes
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    if (allowed.test(file.mimetype) && allowed.test(file.originalname.toLowerCase())) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Upload buffer to Cloudinary
const uploadToCloudinary = (buffer: Buffer, folder: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
};

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Greeting App API' });
});

// POST /api/profile - create or update user profile
app.post('/api/profile', upload.single('profilePicture'), async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    if (!name) return res.status(400).json({ error: 'Name is required' });
    if (!email) return res.status(400).json({ error: 'Email is required' });

    let profilePictureUrl: string | null = null;

    if (req.file) {
      profilePictureUrl = await uploadToCloudinary(req.file.buffer, 'profile-pictures');
    }

    const db = await connectDB();
    const users = db.collection('users');

    const updateData: Record<string, any> = {
      username: name,
      updatedAt: new Date(),
    };
    if (profilePictureUrl) updateData.profilePicture = profilePictureUrl;

    const result = await users.findOneAndUpdate(
      { email },
      {
        $set: updateData,
        $setOnInsert: { email, createdAt: new Date() },
      },
      { upsert: true, returnDocument: 'after' }
    );

    res.json({ message: 'Profile updated successfully', profile: result });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// GET /api/profile/:email - fetch user profile
app.get('/api/profile/:email', async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const db = await connectDB();
    const user = await db.collection('users').findOne({ email });

    if (!user) return res.status(404).json({ error: 'Profile not found' });

    res.json({ profile: user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
