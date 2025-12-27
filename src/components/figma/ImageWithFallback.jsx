import { useState } from 'react';
import { motion } from 'motion/react';

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackSrc = 'https://via.placeholder.com/400x300?text=Image+Not+Found',
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    setImgSrc(fallbackSrc);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative overflow-hidden">
      {isLoading && !hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`absolute inset-0 bg-slate-200 animate-pulse ${className}`}
        />
      )}
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        src={imgSrc}
        alt={alt}
        className={className}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
}
