import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";

interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
}

const elements: Element[] = [
  { symbol: "H", name: "Hydrogen", atomicNumber: 1 },
  { symbol: "He", name: "Helium", atomicNumber: 2 },
  { symbol: "Li", name: "Lithium", atomicNumber: 3 },
  { symbol: "Be", name: "Beryllium", atomicNumber: 4 },
  { symbol: "B", name: "Boron", atomicNumber: 5 },
  { symbol: "C", name: "Carbon", atomicNumber: 6 },
  { symbol: "N", name: "Nitrogen", atomicNumber: 7 },
  { symbol: "O", name: "Oxygen", atomicNumber: 8 },
  { symbol: "F", name: "Fluorine", atomicNumber: 9 },
  { symbol: "Ne", name: "Neon", atomicNumber: 10 },
];

interface PeriodicTableGameProps {
  onBack: () => void;
}

const PeriodicTableGame = ({ onBack }: PeriodicTableGameProps) => {
  const [currentElement, setCurrentElement] = useState<Element | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const { toast } = useToast();

  const generateQuestion = () => {
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    const wrongOptions = elements
      .filter((el) => el.name !== randomElement.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((el) => el.name);
    
    const allOptions = [...wrongOptions, randomElement.name].sort(() => Math.random() - 0.5);
    
    setCurrentElement(randomElement);
    setOptions(allOptions);
  };

  const checkAnswer = (selectedAnswer: string) => {
    if (!currentElement) return;

    if (selectedAnswer === currentElement.name) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "Keep going!",
        className: "bg-green-500 text-white",
      });
      generateQuestion();
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer was ${currentElement.name}`,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    } else {
      toast({
        title: "Time's up!",
        description: `Final score: ${score}`,
        variant: "default",
      });
    }
  }, [timeLeft]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-6">
      <Button variant="outline" onClick={onBack} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      <Card className="max-w-lg mx-auto p-6 backdrop-blur-lg bg-white/90">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">Periodic Table Challenge</h2>
          <div className="flex justify-between text-lg">
            <span>Score: {score}</span>
            <span>Time: {timeLeft}s</span>
          </div>
        </div>

        {currentElement && (
          <>
            <div className="text-center mb-8">
              <div className="inline-block p-6 border-4 border-pink-500 rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 mb-4">
                <div className="text-6xl font-bold text-pink-600">{currentElement.symbol}</div>
                <div className="text-sm text-pink-800">Atomic Number: {currentElement.atomicNumber}</div>
              </div>
              <div className="text-xl">What element is this?</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {options.map((option) => (
                <Button
                  key={option}
                  onClick={() => checkAnswer(option)}
                  className="text-lg py-6"
                  disabled={timeLeft === 0}
                >
                  {option}
                </Button>
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default PeriodicTableGame;