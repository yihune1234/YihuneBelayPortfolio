import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage, placeholder, responsive } from '@cloudinary/react';

/**
 * CloudinaryImage component that handles both Cloudinary Public IDs
 * and existing local/external URLs using Cloudinary's Fetch API.
 */
const CloudinaryImage = ({ src, alt, className, width = 800, height = 500, crop = 'fill' }) => {
  const cld = new Cloudinary({ cloud: { cloudName: 'dqcrqtzz6' } });
  
  if (!src) return null;

  let img;

  // Determine if it's a Cloudinary Public ID or a full URL
  if (src.startsWith('http') || src.startsWith('/uploads')) {
    // If it's a URL, use Cloudinary's 'fetch' delivery type
    let originalUrl = src;
    if (src.startsWith('/uploads')) {
      const BASE_URL = 'https://portfoliobackend-a6ah.onrender.com';
      originalUrl = `${BASE_URL}${src}`;
    }

    img = cld.image(originalUrl)
      .setDeliveryType('fetch')
      .format('auto')
      .quality('auto');
  } else {
    // It's a Public ID (ideal case for new uploads)
    img = cld.image(src)
      .format('auto')
      .quality('auto');
  }

  // Apply common transformations
  if (crop === 'fill') {
    img.resize(auto().gravity(autoGravity()).width(width).height(height));
  }

  return (
    <AdvancedImage 
      cldImg={img} 
      alt={alt} 
      className={className}
      plugins={[responsive({ steps: [640, 768, 1024, 1280] }), placeholder({ mode: 'blur' })]}
    />
  );
};

export default CloudinaryImage;
