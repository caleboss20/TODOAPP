import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRef,useState } from "react";
 function SplashScreen({name,setName}){
    const navigate=useNavigate();
    const [change,setChange]=useState(false);

    // useEffect(()=>{
    // const timer=setTimeout(()=>{
    //   navigate("/");
    //   setChange(true);
    //  },3000)
    // return()=>clearTimeout(timer);
    // },[])
  const directIn=()=>{
    navigate("/TodoList");
  }

  const fullText = "Welcome to my Todo app",
  typingSpeed = 80,            
  placeholder = "Enter your name...",
  onSubmitName = (name) => { console.log("Name submitted:", name); } 

  const [displayed, setDisplayed] = useState(""); 
  const [index, setIndex] = useState(0);          
  const [finished, setFinished] = useState(false);
  const timerRef = useRef(null);
  const inputRef = useRef(null);
  // Typing effect
  useEffect(() => {
    // If already finished, do nothing
    if (finished) return;
    if (index < fullText.length) {
      timerRef.current = setTimeout(() => {
        setDisplayed((prev) => prev + fullText[index]);
        setIndex((i) => i + 1);
      }, typingSpeed);
    } else {
      // finished typing
      setFinished(true);
    }
    return () => clearTimeout(timerRef.current);
  }, [index, fullText, typingSpeed, finished]);
  // Focus input when typing completes
  useEffect(() => {
    if (finished && inputRef.current) {
      // small delay to allow layout
      inputRef.current.focus();
    }
  }, [finished]);
  const submit = () => {
    const trimmed = name.trim();
    localStorage.setItem("trimmed",trimmed);
    if (!trimmed) return;
    if(trimmed.length<3)return;
    onSubmitName(trimmed);
    setName("");
    directIn();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") submit();
  };



    return(
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-violet-50 to-white p-6">
      <style>{`
        /* small blinking cursor */
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
        .splash-cursor {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          margin-left: 2px;
          background: currentColor;
          vertical-align: middle;
          animation: blink 1s steps(2, start) infinite;
        }
      `}</style>
      <div className="max-w-xl w-full text-center p-8   ">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">
          <span className="">{displayed}</span>
          {/* Show cursor while typing, and keep a faint cursor after finished */}
          <span className="splash-cursor" style={{ opacity: finished ? 0.7 : 1 }} />
        </h1>
        {/* show the input only after typing finished */}
        <div className={`transition-all duration-300 ${finished ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
          <div className="flex items-center justify-center gap-3">
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) =>setName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full max-w-md px-4 py-3 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
            <button
              onClick={submit}
              className="px-4 py-3 text-lg bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition"
            >
              Enjoy
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-3"></p>
        </div>
      </div>
    </div>
    )

}
export default SplashScreen;