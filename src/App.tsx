import { FiRefreshCw } from "react-icons/fi";
import { LuTimer } from "react-icons/lu";
import Button from "./components/button";
import Select from "./components/select";
import SummaryCard from "./components/summary-card";
import Textarea from "./components/textarea";

function App() {
  return (
    <main className="bg-slate-100 h-screen flex items-center justify-center p-4 md:p-6">
      <section className="border py-4 md:py-6 px-2 md:px-6 rounded-lg bg-white w-full max-w-4xl">
        <div className="md:flex space-y-5 md:space-y-0">
          <h1 className="text-center text-xl font-semibold">Typing Speed Calculator</h1>
          <div className="md:ms-auto flex items-center justify-center gap-2">
            <Select>
              <Select.Trigger className="w-32">
                <Select.Value placeholder="Select" />
              </Select.Trigger>
              <Select.Content className="p-1 md:p-2">
                <Select.Item value="1">1 Minute</Select.Item>
                <Select.Item value="2">2 Minutes</Select.Item>
                <Select.Item value="5">5 Minutes</Select.Item>
              </Select.Content>
            </Select>
            <Button className="inline-flex items-center gap-2">
              <FiRefreshCw size={18} />
              Start
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-2 mt-4 justify-center">
          <LuTimer className="text-2xl md:text-3xl"/>
          <span className="text-lg md:text-xl font-semibold">1:00</span>
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
