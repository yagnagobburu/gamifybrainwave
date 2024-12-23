import { useState } from "react";
import SubjectCard from "@/components/SubjectCard";
import SpeedMathGame from "@/components/SpeedMathGame";
import PeriodicTableGame from "@/components/PeriodicTableGame";
import CrissCrossPuzzle from "@/components/CrissCrossPuzzle";
import Navbar from "@/components/Navbar";

const Index = () => {
  const [selectedSubject, setSelectedSubject] = useState<"math" | "chemistry" | "reasoning" | null>(
    null
  );

  if (selectedSubject === "math") {
    return (
      <>
        <Navbar />
        <SpeedMathGame onBack={() => setSelectedSubject(null)} />
      </>
    );
  }

  if (selectedSubject === "chemistry") {
    return (
      <>
        <Navbar />
        <PeriodicTableGame onBack={() => setSelectedSubject(null)} />
      </>
    );
  }

  if (selectedSubject === "reasoning") {
    return (
      <>
        <Navbar />
        <CrissCrossPuzzle onBack={() => setSelectedSubject(null)} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#9b87f5]/20 to-[#0FA0CE]/20">
      <Navbar />
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] via-[#0FA0CE] to-[#F97316]">
              NeuroQuest
            </h1>
            <p className="text-xl text-[#8E9196]">
              Learn through interactive games and challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SubjectCard
              subject="math"
              onClick={() => setSelectedSubject("math")}
            />
            <SubjectCard
              subject="chemistry"
              onClick={() => setSelectedSubject("chemistry")}
            />
            <SubjectCard
              subject="reasoning"
              onClick={() => setSelectedSubject("reasoning")}
            />
          </div>
        </div>
      </div>
      
      <footer className="text-center py-4 text-[#8E9196] mt-8">
        © {new Date().getFullYear()} NeuroQuest. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;