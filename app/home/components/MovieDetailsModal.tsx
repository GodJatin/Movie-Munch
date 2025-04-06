// app/home/components/common/MovieDetailsModal.tsx
import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Movie } from "../components/types/Movie";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie | null;
  onWatchNow: (title: string, url: string) => void;
}

const MovieDetailsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  movie,
  onWatchNow,
}) => {
  if (!movie) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
        <div className="min-h-screen px-4 text-center bg-black/70">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <Dialog.Panel className="inline-block w-full max-w-3xl p-6 my-20 overflow-hidden text-left align-middle transition-all transform bg-gray-900 shadow-xl rounded-2xl text-white">
              <div className="flex gap-6">
                <img
                  src={movie.image || "https://via.placeholder.com/300x450?text=No+Image"}
                  alt={movie.title}
                  className="w-48 h-auto rounded-lg shadow-md"
                />
                <div className="flex-1 space-y-2">
                  <Dialog.Title className="text-2xl font-bold">{movie.title}</Dialog.Title>
                  <p className="text-sm text-gray-300">{movie.description}</p>

                  <div className="text-sm mt-4 space-y-1">
                    {movie.genre && <p><span className="text-red-400">Genre:</span> {movie.genre}</p>}
                    {movie.rating && <p><span className="text-red-400">Rating:</span> {movie.rating}</p>}
                    {movie.duration && <p><span className="text-red-400">Duration:</span> {movie.duration}</p>}
                    {movie.cast && <p><span className="text-red-400">Cast:</span> {movie.cast}</p>}
                    {movie.releaseYear && <p><span className="text-red-400">Year:</span> {movie.releaseYear}</p>}
                    {movie.language && <p><span className="text-red-400">Language:</span> {movie.language}</p>}
                  </div>

                  {movie.streamingUrl && (
                    <button
                      className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
                      onClick={() => onWatchNow(movie.title, movie.streamingUrl!)}
                    >
                      Watch Now
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-6 text-right">
                <button
                  onClick={onClose}
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MovieDetailsModal;
