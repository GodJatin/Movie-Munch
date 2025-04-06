import React from "react";
import { Movie } from "@/app/home/components/types/Movie";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  movie: Movie | null;
  onClose: () => void;
  onWatchNow: (title: string, url: string) => void;
}

const ContentDetailsModal: React.FC<Props> = ({ movie, onClose, onWatchNow }) => {
  if (!movie) return null;

  return (
    <Dialog open={!!movie} onClose={onClose} className="fixed z-50 inset-0 flex items-center justify-center p-4 bg-black/70">
      <Dialog.Panel className="relative bg-zinc-900 text-white max-w-4xl w-full rounded-xl overflow-hidden shadow-lg">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
          {/* Poster */}
          <div>
            <img
              src={movie.image || "https://via.placeholder.com/300x450?text=No+Image"}
              alt={movie.title}
              className="w-full h-auto rounded"
            />
          </div>

          {/* Details */}
          <div className="md:col-span-2 space-y-3">
            <h2 className="text-2xl font-bold">{movie.title}</h2>
            <p className="text-sm text-gray-300">{movie.description}</p>

            <div className="text-sm">
              {movie.genre && <p><strong>Genre:</strong> {movie.genre}</p>}
              {movie.rating && <p><strong>Rating:</strong> {movie.rating}</p>}
              {movie.duration && <p><strong>Duration:</strong> {movie.duration}</p>}
              {movie.cast && <p><strong>Cast:</strong> {movie.cast}</p>}
              {movie.releaseYear && <p><strong>Year:</strong> {movie.releaseYear}</p>}
              {movie.language && <p><strong>Language:</strong> {movie.language}</p>}
            </div>

            {/* Trailer */}
            {movie.trailerUrl && (
              <div className="aspect-video mt-4">
                <iframe
                  src={movie.trailerUrl}
                  title="Trailer"
                  className="w-full h-full rounded"
                  allowFullScreen
                />
              </div>
            )}

            {/* Watch Now Button */}
            {movie.streamingUrl && (
              <button
                onClick={() => onWatchNow(movie.title, movie.streamingUrl!)}
                className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold"
              >
                Watch Now
              </button>
            )}
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default ContentDetailsModal;
