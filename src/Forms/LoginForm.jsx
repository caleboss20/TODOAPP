import { useNavigate } from "react-router-dom";

function LoginForm() {
    const navigate=useNavigate();
  return (
    <div>
      <div className="p-6 mt-10">
        <h2 className="font-medium text-3xl">Login</h2>
        <p className="text-gray-700 text-md mt-4">Welcome back to the app</p>

        <form action="" className="mt-14">
          <div className="flex flex-col gap-3 mb-5">
            <label className="text-black text-md font-small">
              Email Address
            </label>
            <input
              type="email"
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

          <div className="flex mt-8 ml-1 gap-3 items-center">
            <input type="checkbox" className="w-4 h-4 accent-blue-700" />
            <span className="text-gray-700 text-sm">Keep me signed in</span>
          </div>

    <button className="w-full mt-6 py-3 bg-blue-700 rounded-full text-white font-medium text-sm">Login</button>
        <div className="flex items-center my-4 mt-10">
            <hr className="flex-1 border-t border-gray-300" />
            <span className="mx-2 text-gray-400 font-small">or</span>
            <hr className="flex-1 border-t border-gray-300"/>
        </div>

        <button className="w-full mt-6 py-3 bg-gray-200 rounded-full text-gray-500 font-medium text-sm">Continue with Google</button>
        <h2
        onClick={()=>navigate("/signup")}
         className="text-center font-medium text-md text-blue-600 mt-8">Create an account</h2>
        </form>
        
      </div>
    </div>
  );
}
export default LoginForm;
