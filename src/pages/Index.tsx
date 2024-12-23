import { useState } from "react";
import SubjectCard from "@/components/SubjectCard";
import SpeedMathGame from "@/components/SpeedMathGame";

const Index = () => {
  const [selectedSubject, setSelectedSubject] = useState<"math" | "chemistry" | "reasoning" | null>(
    null
  );

  if (selectedSubject === "math") {
    return <SpeedMathGame onBack={() => setSelectedSubject(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            EduPlay Hub
          </h1>
          <p className="text-xl text-gray-600">
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
  );
};

export default Index;