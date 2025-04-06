import React from "react";

interface ProfileModalProps {
  user: { name: string; email: string; image?: string };
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Profile Details</h2>

        <div className="flex flex-col space-y-3 text-center">
          <div>
            <span className="font-semibold">Name:</span> {user.name}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {user.email}
          </div>
        </div>

        <button
          className="mt-6 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
