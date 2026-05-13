'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getCardById } from '@/app/data/cards';
import { useEffect, useState } from 'react';

export default function CardDetail() {
  const params = useParams();
  const { data: session } = useSession();
  const API_URL = process.env.NEXTAUTH_URL;

  const card = getCardById(parseInt(params.id as string));

  const [userName, setUserName] = useState(session?.user?.name?.split(' ')[0] || 'Guest');
  const [userImage, setUserImage] = useState('/image1.png');

   useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await fetch(
          `${API_URL}/api/profile?email=${session.user.email}`
        );

        if (res.ok) {
          const data = await res.json();
          if(data.user?.profileUrl) {
            setUserImage(data.user.profileUrl);
          }
          if(data.user?.name) {
            setUserName(data.user.name.split(' ')[0]);
          }
        }
      } catch (err) {
        console.error('Error fetching profile image:', err);
      }
    };

    fetchProfile();
  }, [session]);

  // Helper function to load image
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));

      img.src = src;
    });
  };

  // Draw profile photo
  const drawProfilePhoto = (
    ctx: CanvasRenderingContext2D,
    profileImg: HTMLImageElement,
    canvasWidth: number,
    canvasHeight: number,
    photoPosition: { x: number; y: number; size: number }
  ) => {
    const x = (photoPosition.x / 100) * canvasWidth;
    const y = (photoPosition.y / 100) * canvasHeight;
    const size = (photoPosition.size / 100) * canvasWidth;

    ctx.save();

    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.clip();

    ctx.drawImage(profileImg, x - size / 2, y - size / 2, size, size);

    ctx.restore();
  };

  // Draw user name
  const drawNameText = (
    ctx: CanvasRenderingContext2D,
    name: string,
    canvasWidth: number,
    canvasHeight: number,
    namePosition: { x: number; y: number }
  ) => {
    ctx.fillStyle = '#7B4F2E';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';

    const x = (namePosition.x / 100) * canvasWidth;
    const y = (namePosition.y / 100) * canvasHeight;

    ctx.fillText(name, x, y);
  };

  // Generate card image blob
  const generateCardBlob = async (): Promise<Blob> => {
    if (!card?.image) {
      throw new Error('No card image available');
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Canvas context not available');
    }

    try {
      // Load base image
      const baseImg = await loadImage(card.image);

      canvas.width = baseImg.width;
      canvas.height = baseImg.height;

      // Draw base card
      ctx.drawImage(baseImg, 0, 0);

      // Draw profile image
      if (card.photoPosition) {
        const profileImg = await loadImage(userImage);

        drawProfilePhoto(
          ctx,
          profileImg,
          canvas.width,
          canvas.height,
          card.photoPosition
        );
      }

      // Draw name
      if (card.namePosition) {
        drawNameText(
          ctx,
          userName,
          canvas.width,
          canvas.height,
          card.namePosition
        );
      }

      // Convert to blob
      return new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to generate image blob'));
            }
          },
          'image/png'
        );
      });
    } catch (error) {
      console.error('Error generating card image:', error);
      throw error;
    }
  };

  // Download card
  const handleDownload = async () => {
    if (!card) return;

    try {
      const blob = await generateCardBlob();

      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');

      link.href = url;
      link.download = `${card.title
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase()}.png`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);

      alert('Failed to download card. Please try again.');
    }
  };

  // Share card
  const handleShare = async () => {
    if (!card) return;

    try {
      const blob = await generateCardBlob();

      const file = new File([blob], `${card.title}.png`, {
        type: 'image/png',
      });

      const cardUrl = window.location.href;

      // Share file directly
      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: card.title,
          text: `Check out this greeting card: ${card.title}`,
          files: [file],
        });
      }

      // Share URL
      else if (navigator.share) {
        await navigator.share({
          title: card.title,
          text: `Check out this greeting card: ${card.title}`,
          url: cardUrl,
        });
      }

      // Copy URL fallback
      else {
        await navigator.clipboard.writeText(cardUrl);

        alert(
          'Link copied to clipboard. You can now share it manually.'
        );
      }
    } catch (error) {
      console.error('Share failed:', error);

      alert(
        'Sharing failed. You can download the card and share it manually.'
      );
    }
  };

  // Card not found
  if (!card) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white dark:bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
            Card Not Found
          </h1>

          <Link
            href="/home"
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          >
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white dark:bg-black px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href={`/cards/${card.category}`}
          className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white mb-6 inline-block"
        >
          ← Back to {card.category} cards
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
            {card.image ? (
              <div className="relative w-full">
                {/* Base greeting card */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-auto block"
                />

                {/* Profile image */}
                {card.photoPosition && (
                  <img
                    src={userImage}
                    alt="Profile"
                    className="absolute object-cover rounded-full"
                    style={{
                      left: `${card.photoPosition.x}%`,
                      top: `${card.photoPosition.y}%`,
                      width: `${card.photoPosition.size}%`,
                      aspectRatio: '1 / 1',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                )}

                {/* User name */}
                {card.namePosition && (
                  <span
                    className="absolute font-semibold"
                    style={{
                      left: `${card.namePosition.x}%`,
                      top: `${card.namePosition.y}%`,
                      transform: 'translateX(-50%)',
                      color: '#7B4F2E',
                      fontSize: '1rem',
                    }}
                  >
                    {userName}
                  </span>
                )}
              </div>
            ) : (
              <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                <span className="text-gray-400 dark:text-gray-600">
                  Card Preview
                </span>
              </div>
            )}
          </div>

          {/* Right section */}
          <div>
            <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">
              {card.title}
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Personalized for:{' '}
              <span className="font-medium text-black dark:text-white">
                {userName}
              </span>
            </p>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your photo and name will appear on the card.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleDownload}
                className="w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded font-medium hover:opacity-80"
              >
                Download Card
              </button>

              <button
                onClick={handleShare}
                className="w-full py-3 border border-gray-300 dark:border-gray-700 rounded font-medium hover:bg-gray-50 dark:hover:bg-gray-800 text-black dark:text-white"
              >
                Share Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}