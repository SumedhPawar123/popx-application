import React, { useRef, useState } from "react";
import "./AccountPage.css";


const CameraIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="white"
  >
    <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z" />
    <path d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
  </svg>
);

const DEFAULT_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='40' fill='%23d0b0f0'/%3E%3Ccircle cx='40' cy='30' r='14' fill='%23ffffff'/%3E%3Cellipse cx='40' cy='62' rx='22' ry='14' fill='%23ffffff'/%3E%3C/svg%3E";

const AccountPage = ({ user, onUpdatePhoto, onLogout, navigate }) => {
  const fileInputRef = useRef(null);
  const [photoError, setPhotoError] = useState("");

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setPhotoError("Only JPG, PNG, WEBP, or GIF files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setPhotoError("File size must be less than 5 MB.");
      return;
    }

    setPhotoError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      onUpdatePhoto(ev.target.result);
    };
    reader.readAsDataURL(file);

    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const displayName = user?.fullName || "Marry Doe";
  const displayEmail = user?.email || "Marry@Gmail.Com";
  const displayPhoto = user?.photo || DEFAULT_AVATAR;

  return (
    <div className="account-page">
      {/* Header */}
      <div className="account-header">
        <h2 className="account-heading">Account Settings</h2>
      </div>

      <div className="account-divider-top" />

      {/* Profile section */}
      <div className="profile-section">
        <div className="avatar-wrapper">
          <img
            src={displayPhoto}
            alt="Profile"
            className="avatar-img"
            onError={(e) => {
              e.target.src = DEFAULT_AVATAR;
            }}
          />

          {/* Camera button */}
          <button
            className="camera-btn"
            onClick={handlePhotoClick}
            title="Change profile photo"
            aria-label="Change profile photo"
          >
            <CameraIcon />
          </button>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        <div className="profile-info">
          <p className="profile-name">{displayName}</p>
          <p className="profile-email">{displayEmail}</p>
        </div>
      </div>

      {photoError && <p className="photo-error">{photoError}</p>}

      <div className="account-divider-bottom" />

      {/* Bio / description */}
      <p className="account-bio">
        Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
        Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat,
        Sed Diam
      </p>

      {/* Logout */}
      <div className="account-footer">
        <button
          className="btn btn-secondary btn-logout"
          onClick={() => {
            onLogout();
            navigate("welcome");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
