import React, { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Avatar } from "@mui/material";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { updateProfilePicture, removeFromPlaylist } from "../../Redux/actions/profile";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, cancelSubscription } from "../../Redux/actions/user";
import toast from "react-hot-toast";
import "./profilec.css";

export default function ProfilePage({ user }) {
  const [imagePrev, setImagePrev] = useState("");
  const [image, setImage] = useState(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(state => state.profile);
  const {
    loading: subscriptionLoading,
    message: subscriptionMessage,
    error: subscriptionError,
  } = useSelector(state => state.subscription);


  const handleRemoveFromPlaylist = async id => {
    try {
      await dispatch(removeFromPlaylist(id));
      dispatch(loadUser());
    } catch (error) {
      console.error('Error removing from playlist:', error);
    }
  };
  const changeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImagePrev(reader.result);
        setImage(file);
      };
    }
  };

  const changeImageSubmitHandler = async(e) => {
    e.preventDefault();
    if (image) {
      const myForm = new FormData();
      myForm.append('file', image);
      await dispatch(updateProfilePicture(myForm));
      dispatch(loadUser());
      onClose();
    }
  };

  

  const cancelSubscriptionHandler = async () => {
    try {
      await dispatch(cancelSubscription());
    } catch (error) {
      console.error('Error cancelling subscription:', error);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearerror" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearmessage" });
    }

    if (subscriptionMessage) {
      toast.success(subscriptionMessage);
      dispatch({ type: 'clearMessage' });
      dispatch(loadUser());
    }

    if (subscriptionError) {
      toast.error(subscriptionError);
      dispatch({ type: 'clearError' });
    }
  }, [dispatch, error, message, subscriptionMessage, subscriptionError]);




  const createdAt = user.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A";

  return (
    <div className="profile-container">
      <h1>Profile Page</h1>
      <div className="profile-content">
        <div className="profile-header">
          <Avatar style={{ width: 100, height: 100 }} src={user.avatar?.url || ""} />
          <button disabled={loading} onClick={onOpen}>Change Profile</button>
        </div>

        <div className="profile-details">
          <div className="profile-field">
            <h4>Name</h4>
            <p>{user.name}</p>
          </div>
          <div className="profile-field">
            <h4>Email</h4>
            <p>{user.email}</p>
          </div>
          <div className="profile-field">
            <h4>Created At</h4>
            <p>{createdAt}</p>
          </div>

          {user.role !== "admin" && (
            <div className="profile-field">
              <h4>Subscription</h4>
              {user.subscription?.status === "active" ? (
                <button
                  disabled={subscriptionLoading}
                  onClick={cancelSubscriptionHandler}
                >
                  Cancel Subscription
                </button>
              ) : user.subscription?.status === "inactive" || user.subscription?.refundPending ? (
                <Link to="/subscribe">
                  <button className="subscribe-btn">Subscribe</button>
                </Link>
              ) : (
                <p>No active subscription to cancel.</p>
              )}
            </div>
          )}

          <div className="profile-actions">
            <Link to="/changeprofile">
              <button>Update Profile</button>
            </Link>
            <Link to="/updatepassword">
              <button>Change Password</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="profile-playlist">
        <h2>Playlist</h2>
        {user.playlist?.length > 0 && (
          <div className="playlist-content">
            {user.playlist.map((element, index) => (
              <div className="playlist-item" key={index}>
                <img src={element.poster} alt="Course Poster" />
                <Link to={`/course/${element.course}`}>
                  <button>Watch Now</button>
                </Link>
                <button disabled={loading} onClick={() => handleRemoveFromPlaylist(element.course)}>
                  <RiDeleteBin7Fill />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {isOpen && (
        <ChangeProfileBox
          imagePrev={imagePrev}
          changeImage={changeImage}
          changeImageSubmitHandler={changeImageSubmitHandler}
          onClose={onClose}
        />
      )}
    </div>
  );
}

function ChangeProfileBox({ onClose, imagePrev, changeImage, changeImageSubmitHandler }) {
  return (
    <div className="change-profile-box open">
      <div className="change-profile-content">
        <form onSubmit={changeImageSubmitHandler}>
          <div className="profile-box-field">
            {imagePrev && <Avatar src={imagePrev} />}
            <input type="file" onChange={changeImage} />
            <button type="submit">Change</button>
          </div>
        </form>
      </div>
      <div className="profile-footer">
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
