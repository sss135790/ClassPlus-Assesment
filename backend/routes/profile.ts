// routes/profile.ts
import express, {  Response } from "express";
import { Request } from "express";
import cloudinary from "../config/cloudinary";
import User from "../models/User";
import { upload } from "../middleware/upload";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const router = express.Router();

/**
 * POST /api/profile
 * FormData:
 * - name
 * - email
 * - profileUrl (file)
 */

router.post(
  "/",
  upload.single("profileUrl"),
  async (req: MulterRequest, res: Response) => {
    try {
      const { name, email } = req.body as {
        name: string;
        email: string;
      };

      let imageUrl: string | null = null;

      // If file exists, upload to Cloudinary
      if (req.file) {
        const result = await new Promise<any>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "profile_pictures",
              resource_type: "image",
            },
            (error, result) => {
              if (error || !result) return reject(error);
              resolve(result);
            }
          );

          stream.end(req.file!.buffer);
        });

        imageUrl = result.secure_url;
      }

      // Update or create user
      const user = await User.findOneAndUpdate(
        { email },
        {
          name,
          email,
          ...(imageUrl && { profileUrl: imageUrl }),
        },
        { new: true, upsert: true }
      );

      res.status(200).json({
        message: "Profile updated successfully",
        user,
      });
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({
        error: "Server error while updating profile",
      });
    }
  }
);

router.get("/", async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string | undefined;

    if (!email) {
      return res.status(400).json({
        error: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json({ user });
  } catch (err) {
    console.error("Fetch user error:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

export default router;