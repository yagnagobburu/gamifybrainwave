import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import confetti from 'canvas-confetti';

interface SpeedMathGameProps {
  onBack: () => void;
}

const questionSets = [
  [
    { question: "If a robot can process 5 tasks per minute, how many tasks can it process in 12 minutes?", options: [60, 55, 50, 65], answer: 60 },
    { question: "A binary number system has 2 digits (0,1). How many different 3-digit binary numbers are possible?", options: [8, 6, 4, 10], answer: 8 },
    { question: "If 3 robots take 6 hours to assemble a machine, how many hours will 2 robots take?", options: [9, 8, 7, 10], answer: 9 },
    { question: "What is the probability of getting a number greater than 4 when rolling a six-sided die?", options: ["1/3", "1/2", "2/3", "1/6"], answer: "1/3" },
    { question: "If a robot moves 3 steps forward and 2 steps back, then repeats this 4 times, how many steps forward is it from the starting point?", options: [4, 5, 3, 6], answer: 4 }
  ],
  // ... 4 more similar sets with different questions
];

const SpeedMathGame = ({ onBack }: SpeedMathGameProps) => {
  const [currentSet, setCurrentSet] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && gameStarted) {
      endGame();
    }
  }, [timeLeft, gameStarted]);

  const startGame = () => {
    setCurrentSet(Math.floor(Math.random() * questionSets.length));
    setGameStarted(true);
    setTimeLeft(30);
    setScore(0);
    setCurrentQuestion(0);
  };

  const endGame = () => {
    setGameStarted(false);
    toast({
      title: "Game Over!",
      description: `Final score: ${score} out of 5`,
      className: "bg-secondary text-white",
    });
  };

  const handleAnswer = (selectedAnswer: number | string) => {
    const correct = selectedAnswer === questionSets[currentSet][currentQuestion].answer;
    
    if (correct) {
      setScore(prev => prev + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      toast({
        title: "Correct!",
        description: "Keep going!",
        className: "bg-green-500 text-white",
      });
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer was ${questionSets[currentSet][currentQuestion].answer}`,
        variant: "destructive",
      });
    }

    if (currentQuestion < 4) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      endGame();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#9b87f5] p-6">
      <Button variant="outline" onClick={onBack} className="mb-6 bg-[#F1F1F1] hover:bg-[#D6BCFA]">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      <Card className="max-w-2xl mx-auto p-6 backdrop-blur-lg bg-[#1A1F2C]/90 border-[#9b87f5] text-white">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2 text-[#9b87f5]">Robotic Math Challenge</h2>
          {gameStarted && (
            <div className="flex justify-between text-lg text-[#8E9196]">
              <span>Score: {score}/5</span>
              <span>Time: {timeLeft}s</span>
            </div>
          )}
        </div>

        {!gameStarted ? (
          <div className="text-center">
            <p className="mb-4 text-[#8E9196]">Test your mathematical skills with robot-themed problems!</p>
            <Button onClick={startGame} className="bg-[#0FA0CE] hover:bg-[#0FA0CE]/80">
              Start Game
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-xl mb-4">{questionSets[currentSet][currentQuestion].question}</p>
              <div className="grid grid-cols-2 gap-4">
                {questionSets[currentSet][currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="p-4 text-lg bg-[#9b87f5] hover:bg-[#9b87f5]/80"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default SpeedMathGame;