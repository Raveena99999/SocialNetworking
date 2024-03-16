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
    <div >
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8" style={{display:"flex",border:"2px solid red"}}>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm" >
   
    <h2 class=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Your Posts</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
     

     

<textarea style={{ width:"100%",margin:"auto"}} value={post.textContent} onChange={handleChange}  name="textContent" id="" cols="30" rows="10" placeholder='Write Your Post'></textarea>
      <div >
        <button type="submit" class="flex w-60 m-auto mb-6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">create post</button>
      </div>
    </form>
   
    
  </div>
  <div style={{border:"2px solid black" ,height:"auto"}}>
          {postData.map((post, index) => (
            <div key={index} class="bg-gray-100 p-4 mt-4">
              <p class="text-pink-400">{post.textContent}</p>
              <button style={{border:"2px solid black",borderRadius:"0.8rem" ,padding:"0.1rem",fontSize:"20px"}} onClick={()=>{handleDelete(post._id)}}>Delete</button>
              <button style={{marginLeft:"1rem",border:"2px solid black",borderRadius:"0.8rem" ,padding:"0.1rem",fontSize:"20px"}}>Update</button>
            </div>
          ))}
        </div>
 
</div>

    </div>
  )
}
