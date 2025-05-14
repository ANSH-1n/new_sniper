

'use client';

import { useEffect, useState } from 'react';
import { MouseParallax } from 'react-just-parallax';

const ParallaxSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Only set the component to be visible after mounting on the client
    setIsClient(true);
  }, []);

  // If not client-side yet, return null (or a loading spinner if you prefer)
  if (!isClient) {
    return null; // Or you can return a <div>Loading...</div> if needed
  }

  return (
    <MouseParallax strength={0.1}>
      {/* Add content here if needed */}
    </MouseParallax>
  );
};

export default ParallaxSection;
