function SignUp(){
 return(
    <div>
      <div className="p-6 mt-10">
        <h2 className="font-medium text-3xl">Create an account</h2>
        

        <form action="" className="mt-10 flex flex-col gap-3">
   <div className="flex flex-col gap-3 mb-5">
            <label className="text-black text-md font-small">Name</label>
            <input
              type="text"
              placeholder="Isaac Kwaw"
              className=" w-full border-1 border-gray-300 rounded-full py-3 px-2"
            />
          </div>

          <div className="flex flex-col gap-3 mb-5">
            <label className="text-black text-md font-small">
              Email Address
            </label>
            <input
              type="email"
              placeholder="mensah_4@st.knust.edu.gh"
              className="text-lg w-full border-1 border-gray-300 rounded-full py-3 px-2"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-black text-md font-small">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full border-1 border-gray-300 rounded-full py-3 px-2"
            />
          </div>

      <div className="mt-5">
        <span className="text-[12px] text-gray-500">By continuing you agree to our <span className="text-blue-700">terms of service.</span></span>
      </div>

    <button className="w-full mt-6 py-3 bg-blue-700 rounded-full text-white font-medium text-sm">Login</button>
        <div className="flex items-center my-4 mt-5">
            <hr className="flex-1 border-t border-gray-300" />
            <span className="mx-2 text-gray-400 font-small">or</span>
            <hr className="flex-1 border-t border-gray-300"/>
        </div>

        <button className="w-full mt-0 py-3 bg-gray-200 rounded-full text-gray-500 font-medium text-sm">Continue with Google</button>
        <h2
        
         className="text-center text-md text-gray-500 mt-8">Already have an account? 
         <a href="/login"
          className="text-blue-700 font-medium">Sign in here</a></h2>
        </form>
        
      </div>
    </div>
 )
}
export default SignUp;