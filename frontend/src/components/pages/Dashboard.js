import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { auth, db, logout } from "./firebase";
import {
  query,
  collection,
  getDocs,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      if (user && user.uid) {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          setName(userData.name);
          setBio(userData.bio);
        }
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while fetching user data.");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading, navigate]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const saveChanges = async () => {
    try {
      if (user && user.uid) {
        const userRef = collection(db, "users");
        const q = query(userRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const docRef = doc(db, "users", userDoc.id);
          await updateDoc(docRef, {
            name: name,
            bio: bio,
          });
          alert("Changes saved successfully!");
          setIsEditing(false);
        }
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving changes.");
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <div>
          Logged in as: {name}
        </div>
        <div>{user?.email}</div>
        {isEditing ? (
          <div>
            <div className="dashboard__form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="dashboard__form-group">
              <label htmlFor="bio">Bio:</label>
              <textarea
                id="bio"
                value={bio}
                onChange={handleBioChange}
                placeholder="Enter your bio"
              ></textarea>
            </div>
            <button className="dashboard__btn" onClick={saveChanges}>
              Save Changes
            </button>
          </div>
        ) : (
          <div>
            <div>{bio}</div>
            <button
              className="dashboard__btn"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        )}
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
