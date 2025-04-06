import React, { useEffect, useState } from "react";
import { fetchAvailablePlatforms } from "../utils/platformUtils";

interface WatchPlatformModalProps {
  movieTitle: string;
  onClose: () => void;
  onPlatformSelect: (platform: string) => void;
}

const WatchPlatformModal: React.FC<WatchPlatformModalProps> = ({
  movieTitle,
  onClose,
  onPlatformSelect,
}) => {
  const [platforms, setPlatforms] = useState<string[]>([]);

  useEffect(() => {
    const loadPlatforms = async () => {
      const available = await fetchAvailablePlatforms(movieTitle);
      setPlatforms(available);
    };
    loadPlatforms();
  }, [movieTitle]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white text-black p-6 rounded-lg w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">
          Watch "{movieTitle}" on:
        </h2>
        {platforms.length === 0 ? (
          <p>No streaming platforms available.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {platforms.map((platform) => (
              <button
                key={platform}
                onClick={() => onPlatformSelect(platform)}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                {platform}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPlatformModal;
