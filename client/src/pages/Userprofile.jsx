import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Userprofile() {
  let [profileData, setProfileData] = useState([]);
  let [profile, setProfile] = useState({
    username: "",
    bio: "",
    profilePictureUrl: "",
  });
  const [editingIndex, setEditingIndex] = useState(-1);

  async function getProfile() {
    let res = await fetch(`https://kind-pear-springbok-cap.cyclic.app/userprofile/`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    let data = await res.json();
    setProfileData(data.data);
  }

  useEffect(() => {
    getProfile();
  }, []);
  console.log(profileData);

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      console.log(profile);
      let res = await fetch(`https://kind-pear-springbok-cap.cyclic.app/userprofile/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(profile),
      });
      let data = await res.json();
      alert(data.msg);
      console.log(data.msg);
      if (res.ok) {
        setProfileData([...profileData, profile]);
        setProfile({ username: "", bio: "", profilePictureUrl: "" });
      }
    } catch (error) {
      console.log(error);
    }
  }
  function handleChange(event) {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  }

  async function handleDelete(id) {
    try {
      let res = await fetch(`https://kind-pear-springbok-cap.cyclic.app/userprofile/delete/${id}`, {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
      });
      let data = await res.json();
      alert(data.msg);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate(index) {
    try {
      // Make PATCH request to update user profile
      let res = await fetch(
        `https://kind-pear-springbok-cap.cyclic.app/userprofile/update/${profileData[index]._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          credentials: "include",
          body: JSON.stringify(profileData[index]), // Send updated profile data
        }
      );
      let data = await res.json();
      alert(data.msg);
      if (res.ok) {
        // Clear editing state
        setEditingIndex(-1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Function to handle changes in form fields
  function handleChangeUpdate(event, key) {
    // Update profile state with new field value
    const updatedProfile = {
      ...profileData[editingIndex],
      [key]: event.target.value,
    };
    // Update profileData state with the updated profile
    const updatedProfiles = [...profileData];
    updatedProfiles[editingIndex] = updatedProfile;
    setProfileData(updatedProfiles);
  }

  return (
    <div>
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add userdetails here
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                for="username"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div class="mt-2">
                <input
                  onChange={handleChange}
                  value={profile.username}
                  id="username"
                  name="username"
                  type="text"
                  autocomplete="username"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <textarea
              onChange={handleChange}
              value={profile.bio}
              name="bio"
              id=""
              cols="30"
              rows="10"
              placeholder="Add your bio"
            ></textarea>
            <input
              onChange={handleChange}
              value={profile.profilePictureUrl}
              name="profilePictureUrl"
              type="text"
              placeholder="Add profile pic URL"
            />
            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                confirm
              </button>
            </div>
          </form>
        </div>

        <div style={{ border: "2px solid black", height: "auto" }}>
          {/* Render user profiles */}
          {profileData.map((profile, index) => (
            <div key={index} className="bg-gray-100 p-4 mt-4">
              {editingIndex === index ? ( // If profile is being edited, render edit form
                <div>
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Username
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={(event) =>
                          handleChangeUpdate(event, "username")
                        }
                        value={profile.username}
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <textarea
                    onChange={(event) => handleChangeUpdate(event, "bio")}
                    value={profile.bio}
                    name="bio"
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Add your bio"
                  ></textarea>
                  <input
                    onChange={(event) =>
                      handleChangeUpdate(event, "profilePictureUrl")
                    }
                    value={profile.profilePictureUrl}
                    name="profilePictureUrl"
                    type="text"
                    placeholder="Add profile pic URL"
                  />
                  <div>
                    <button
                      onClick={() => handleUpdate(index)} // Handle update on button click
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Update
                    </button>
                  </div>
                </div>
              ) : (
                // If profile is not being edited, render profile details
                <div>
                  <p>
                    Username:{" "}
                    <span
                      style={{
                        color: "blue",
                        fontWeight: "bold",
                        fontSize: "22px",
                        marginLeft: "1rem",
                      }}
                    >
                      {profile.username}
                    </span>
                  </p>
                  <p>
                    User Bio:{" "}
                    <span
                      style={{
                        color: "blue",
                        fontWeight: "bold",
                        fontSize: "22px",
                        marginLeft: "1rem",
                      }}
                    >
                      {profile.bio}
                    </span>
                  </p>
                  <p>
                    Profile URL:{" "}
                    <span
                      style={{
                        color: "blue",
                        fontWeight: "bold",
                        fontSize: "22px",
                        marginLeft: "1rem",
                      }}
                    >
                      {profile.profilePictureUrl}
                    </span>
                  </p>

                  <button
                    onClick={() => handleDelete(profile._id)} // Handle delete on button click
                    style={{
                      border: "2px solid black",
                      borderRadius: "0.8rem",
                      padding: "0.1rem",
                      fontSize: "20px",
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setEditingIndex(index)} // Enable edit mode on button click
                    style={{
                      marginLeft: "1rem",
                      border: "2px solid black",
                      borderRadius: "0.8rem",
                      padding: "0.1rem",
                      fontSize: "20px",
                    }}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
