import { useState } from "react";
import { useRef } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { LuTimer } from "react-icons/lu";
import Button from "./components/button";
import Select from "./components/select";
import SummaryCard from "./components/summary-card";
import Textarea from "./components/textarea";
import { twMerge } from "tailwind-merge";

// Sample paragraphs for typing tests
const sampleTexts = [
  "Typing is an essential skill in today's world, whether you're writing emails, texting, or working on a project. The speed and accuracy of your typing can significantly affect your productivity. Practice makes perfect, so take a few moments to improve your typing skills every day. Focus on maintaining proper posture, using all your fingers, and keeping your eyes on the screen. With consistent practice, you'll notice improvement in both your speed and accuracy. Keep challenging yourself to type faster and more efficiently. Happy typing!",
  "Good typing habits can make a world of difference when it comes to both speed and accuracy. Whether you're writing reports for work, sending quick text messages, or working on a creative project, being able to type effortlessly is a major advantage. The key to becoming a faster typist is to build muscle memory. Start by learning the correct finger placements on the home row keys and avoid looking at the keyboard. By improving your hand-eye coordination and developing a consistent rhythm, you/'ll be able to type faster without compromising on accuracy. Set aside time each day to practice, and track your progress to stay motivated!",
  "Typing is more than just a way to input text—it's a vital skill that can boost your efficiency in almost every aspect of life. Whether you're a student taking notes, a professional drafting emails, or someone working on creative writing, the ability to type quickly and accurately is a powerful tool. To build your typing speed, you need to focus on both accuracy and comfort. Start with a proper hand position and develop a rhythm that feels natural. Don’t rush; it's better to type correctly and slowly at first than to make a lot of mistakes. Gradually, as your muscle memory improves, your speed will increase without you having to think about it. It's important to take breaks, too, so that you avoid strain or fatigue. Remember, progress comes with consistent practice. Challenge yourself with different typing exercises and even timed tests to push your limits. The more you practice, the faster and more accurate you'll become. Keep track of your improvements, and celebrate small victories along the way! Typing is a skill that benefits you every day, so keep honing it.",
  "The best way to learn a new skill is to practice regularly. Consistent practice helps build muscle memory and improve performance. Set aside time each day to work on your craft.",
  "The internet is a vast repository of knowledge. With the right search terms, you can find answers to almost any question. Remember to fact-check and verify sources before sharing information.",
];

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(30);
  const [value, setValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(duration);
  const [content, setContent] = useState(sampleTexts[0]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [stats, setStats] = useState({
    wpm: 0,
    cpm: 0,
    accuracy: 0,
    errors: 0,
  });

  const startTyping = () =>{
    setIsRunning(true)
    setTimeLeft(duration)
    setStats({
      wpm: 0,
      cpm: 0,
      accuracy: 0,
      errors: 0,
    });

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
    calculateStats();
    setContent(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
    setTimeLeft(duration)
    setValue("")
    setIsRunning(false)
  }

  const calculateStats = () => {
    const words = value.trim().split(" ").length;
    const characters = value.length;

    const timeSpent = (duration - timeLeft) / 60;

    const wpm = Math.round(words / timeSpent);

    const cpm = Math.round(characters / timeSpent);

    let errors = 0;

    const minLength = Math.min(content.length, value.length);

    for (let i = 0; i < minLength; i++) {
      if (content[i] !== value[i]) {
        errors++;
      }
    }
    const accuracy = Math.round(((characters - errors) / characters) * 100);

    setStats({
      wpm,
      cpm,
      accuracy,
      errors,
    });
  };

  const renderText = () => {
    return content.split("").map((char, index) => {
      let color = "";

      if (value.length > index) {
        const isCorrect = value[index] === char;
        color = isCorrect ? "text-green-500" : "text-red-500";
      }

      return (
        <span key={index} className={color}>
          {char}
        </span>
      );
    });
  };

  const formatDuration = (duration:number)=>{
    return(
      Math.floor(duration/60) + ":" + (duration%60).toString().padStart(2,"0")
    )
  }
  
  
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
                <Select.Item value="30">30 Seconds</Select.Item>
                <Select.Item value="60">1 Minute</Select.Item>
                <Select.Item value="120">2 Minutes</Select.Item>
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
          {renderText()}
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
          <SummaryCard value={stats.wpm.toString()} unit="WPM" />
          <SummaryCard value={stats.cpm.toString()} unit="CPM" />
          <SummaryCard value={`${stats.accuracy}%`} unit="Accuracy" />
          <SummaryCard value={stats.errors.toString()} unit="Errors" />
        </div>
      </section>
    </main>
  );
}

export default App;
