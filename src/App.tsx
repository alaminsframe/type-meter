import { useState } from "react";
import { useRef } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { LuTimer } from "react-icons/lu";
import Button from "./components/button";
import Select from "./components/select";
import SummaryCard from "./components/summary-card";
import Textarea from "./components/textarea";
import { twMerge } from "tailwind-merge";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(60);
  const [value, setValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTyping = () =>{
    setIsRunning(true)
    setTimeLeft(duration)

    intervalRef.current = setInterval( () => {
      setTimeLeft( (prev)=> {
        if (prev === 0) {
          reset();
          return 0;
        }
        return prev-1;
      });
    },1000)
  }
  const reset = ()=>{
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setTimeLeft(duration)
    setValue("")
    setIsRunning(false)
  }

  // const timer = ()=>{
  //   setInterval( () => {
  //     setTimeLeft( (prev)=> {
  //       return prev-1;
  //     });
  //   },1000)
  //   if (value !== null) {
  //     formatDuration(timeLeft)
  //   }else{
  //     formatDuration(duration)
  //   }
  // }

  const formatDuration = (duration:number)=>{
    return(
      Math.floor(duration/60) + ":" + (duration%60).toString().padStart(2,"0")
    )
  }
  
  
  console.log(value);
  return (
    <main className="bg-slate-100 h-screen flex items-center justify-center p-4 md:p-6">
      <section className="border py-4 md:py-6 px-2 md:px-6 rounded-lg bg-white w-full max-w-4xl">
        <div className="md:flex space-y-5 md:space-y-0">
          <h1 className="text-center text-xl font-semibold">
            Typing Speed Calculator
            <div className="flex justify-center md:justify-start items-center space-x-1.5 mt-1">
              <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce"></div>
            </div>
          </h1>
          <div className="md:ms-auto flex items-center justify-center gap-6 md:gap-2">
            <Select 
              value={duration.toString()}
              onValueChange={(value) => setDuration(parseInt(value))}
              
            >
              <Select.Trigger className="w-24 md:w-28">
                <Select.Value placeholder="Select" />
              </Select.Trigger>
              <Select.Content className="p-1 md:p-2">
                <Select.Item value="60">1 Minute</Select.Item>
                <Select.Item value="120">2 Minutes</Select.Item>
                <Select.Item value="300">5 Minutes</Select.Item>
              </Select.Content>
            </Select>
            <Button 
              className={twMerge("inline-flex items-center gap-2",
                isRunning
                ?"bg-blue-700"
                :""
              )}
              onClick={isRunning ? reset : startTyping}
            >
              <FiRefreshCw className={twMerge("text-sm md:text-lg",isRunning?"block":"hidden")} />
              {isRunning ? 'Reset' : 'Start'}
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-2 mt-4 justify-center">
          <LuTimer className="text-2xl md:text-3xl"/>
          <span className="text-lg md:text-xl font-semibold">
            {isRunning? formatDuration(timeLeft):formatDuration(duration)}
          </span>
        </div>
        <div className="p-3 md:p-6 mt-4 bg-slate-50 rounded-lg">
          <p className="text-sm md:text-base text-slate-500 text-justify">
            Technology continues to evolve at a rapid pace. What was
            cutting-edge yesterday might be obsolete tomorrow. Adaptability and
            continuous learning are key skills in this field. The ability to be
            flexible and learn new skills is essential for a successful career
            in technology.
          </p>
        </div>
        <Textarea
          className="mt-4"
          rows={3}
          placeholder="Type to begin the test"
          value={value}
          onChange={(e)=>setValue(e.target.value)}
          //disabled
        />
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          <SummaryCard value="0" unit="WPM" />
          <SummaryCard value="0" unit="CPM" />
          <SummaryCard value="0%" unit="Accuracy" />
          <SummaryCard value="0" unit="Errors" />
        </div>
      </section>
    </main>
  );
}

export default App;
