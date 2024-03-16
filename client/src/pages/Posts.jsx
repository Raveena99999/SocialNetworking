import React,{useState,useEffect} from 'react'

export default function Posts() {
  let [postData, setPostData] = useState([]);
  let [post, setPost] = useState({ textContent: ""});

  async function getPost() {
    let res = await fetch(`http://localhost:8080/userpost/`, {
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
console.log(postData)


async function handleSubmit(event) {
  try {
    event.preventDefault();
  console.log(post)
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
    console.log(error)
  }
  
  // setPostData([...postData, post]);

  // setPost({ textContent: ""});
}

function handleChange(event) {
  setPost({
    ...post,
    [event.target.name]: event.target.value,
  });
}

async function handleDelete(id) {
  try {
    let res = await fetch(
      `http://localhost:8080/userpost/delete/${id}`,
      {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
      }
    );
    let data = await res.json();
    alert(data.msg);
  } catch (error) {
    console.log(error);
  }
}



  return (
    <div>
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    {/* <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/> */}
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Your Posts</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
      {/* <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
        <div class="mt-2">
          <input id="username" name="username" type="email" autocomplete="username" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div> */}

     

<textarea value={post.textContent} onChange={handleChange}  name="textContent" id="" cols="30" rows="10" placeholder='Write Your Post'></textarea>
      <div >
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">create post</button>
      </div>
    </form>
   
    
  </div>
  <div style={{border:"2px solid black" ,height:"10vh"}}>
          {postData.map((post, index) => (
            <div key={index} class="bg-gray-100 p-4 mt-4">
              <p class="text-pink-400">{post.textContent}</p>
              <button onClick={()=>{handleDelete(post._id)}}>Delete</button>
              <button>Update</button>
            </div>
          ))}
        </div>
 
</div>

    </div>
  )
}
