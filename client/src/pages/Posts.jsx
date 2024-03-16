import React, { useState, useEffect } from "react";

export default function Posts() {
  let [postData, setPostData] = useState([]);
  let [post, setPost] = useState({ textContent: "" });
  const [editingPostId, setEditingPostId] = useState(null); // New state to track editing post id

  async function getPost() {
    let res = await fetch(`https://calm-uniform-eel.cyclic.app/userpost/`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    let data = await res.json();
    setPostData(data.data);
  }

  useEffect(() => {
    getPost();
  }, []);
  console.log(postData);

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      console.log(post);
      let res = await fetch(`http://localhost:8080/userpost/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(post),
      });
      let data = await res.json();
      alert(data.msg);
      console.log(data.msg);
      if (res.ok) {
        setPostData([...postData, post]);
        setPost({ textContent: "" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(event) {
    setPost({
      ...post,
      [event.target.name]: event.target.value,
    });
  }

  async function handleDelete(id) {
    try {
      let res = await fetch(`http://localhost:8080/userpost/delete/${id}`, {
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

  async function handleUpdate(id, updatedContent) {
    try {
      let res = await fetch(`http://localhost:8080/userpost/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({ textContent: updatedContent }),
      });
      let data = await res.json();
      alert(data.msg);
      if (res.ok) {
        // Update the post content in the postData state
        setPostData(
          postData.map((post) =>
            post._id === id ? { ...post, textContent: updatedContent } : post
          )
        );
        setEditingPostId(null); // Clear editingPostId after updating
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div
        class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"
        style={{ display: "flex", border: "2px solid red" }}
      >
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 class=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Your Posts
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" method="POST" onSubmit={handleSubmit}>
            <textarea
              style={{ width: "100%", margin: "auto" }}
              value={post.textContent}
              onChange={handleChange}
              name="textContent"
              id=""
              cols="30"
              rows="10"
              placeholder="Write Your Post"
            ></textarea>
            <div>
              <button
                type="submit"
                class="flex w-60 m-auto mb-6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                create post
              </button>
            </div>
          </form>
        </div>

        <div style={{ border: "2px solid black", height: "auto" }}>
          {postData.map((post, index) => (
            <div key={index} class="bg-gray-100 p-4 mt-4">
              {editingPostId === post._id ? (
                // Render edit form if post is being edited
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate(post._id, post.textContent);
                  }}
                >
                  <textarea
                    style={{ width: "100%", margin: "auto" }}
                    value={post.textContent}
                    onChange={(e) =>
                      setPostData(
                        postData.map((p) =>
                          p._id === post._id
                            ? { ...p, textContent: e.target.value }
                            : p
                        )
                      )
                    }
                    name="textContent"
                    id=""
                    cols="30"
                    rows="10"
                  ></textarea>
                  <button
                    type="submit"
                    style={{
                      border: "2px solid black",
                      borderRadius: "0.8rem",
                      padding: "0.1rem",
                      fontSize: "20px",
                    }}
                  >
                    Update
                  </button>
                </form>
              ) : (
                // Render post content if not being edited
                <>
                  <p class="text-pink-400">{post.textContent}</p>
                  <button
                    style={{
                      border: "2px solid black",
                      borderRadius: "0.8rem",
                      padding: "0.1rem",
                      fontSize: "20px",
                    }}
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                  <button
                    style={{
                      marginLeft: "1rem",
                      border: "2px solid black",
                      borderRadius: "0.8rem",
                      padding: "0.1rem",
                      fontSize: "20px",
                    }}
                    onClick={() => setEditingPostId(post._id)}
                  >
                    Update
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
