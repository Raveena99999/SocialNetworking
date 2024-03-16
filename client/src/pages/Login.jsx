import React, {useState, useContext } from 'react'
import { Link } from 'react-router-dom'
// import { useToast } from "@chakra-ui/react";

import { Authcontext } from '../context/Authcontextprovider';
export default function Login() {
  const [userdetails, setUserdetails] = useState({ email: "", password: "" });
 const {isLogin,setIsLogin} = useContext(Authcontext)
//  const toast = useToast();

 function handleChange(e) {
  setUserdetails({
    ...userdetails,
    [e.target.name]: e.target.value,
  });
}
async function handleSubmit() {
  try {
    let res = await fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      credentials: "include",
      mode: "cors",
      body: JSON.stringify(userdetails),
    });
    

    const data = await res.json();
    if (data.msg === "Login Successful") {
     setIsLogin(true)
     console.log(isLogin);
alert("you logged in successfully")
   
      // toast({
      //   position:"top",
      //   title: "Logged In",
      //   description: "You Logged in Successfully",
      //   status: "success",
      //   duration: 9000,
      //   isClosable: true,
      // });


    } else {
      // setIsLoggedIn(false);
      setIsLogin(false)
      alert("please enter valid crendtials")
      // toast({
      //   position:"top",

      //   title: "Invalid Credential",
      //   description: "Please enter valid credentials",
      //   status: "error",
      //   duration: 9000,
      //   isClosable: true,
      // });
    }
    
  } catch (error) {
    console.log(isLogin);

    setIsLogin(false)

   
    console.log("login failed");
  }

}




  return (
    <div>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    {/* <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/> */}
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login in to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div class="mt-2">
          <input   onChange={handleChange}
                value={userdetails.email} id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          {/* <div class="text-sm">
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div> */}
        </div>
        <div class="mt-2">
          <input   onChange={handleChange}
                value={userdetails.password} id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
      New member?
      <Link  to="/signup" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</Link>
    </p>
  </div>
</div>

    </div>
  )
}