import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";

interface SpeedMathGameProps {
  onBack: () => void;
}

const SpeedMathGame = ({ onBack }: SpeedMathGameProps) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState<"+" | "-" | "*">("+");
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const { toast } = useToast();

  const generateProblem = () => {
    const operations = ["+", "-", "*"];
    const newOperation = operations[Math.floor(Math.random() * operations.length)] as "+" | "-" | "*";
    const max = score < 5 ? 10 : score < 10 ? 20 : 50;
    const newNum1 = Math.floor(Math.random() * max);
    const newNum2 = Math.floor(Math.random() * max);
    setOperation(newOperation);
    setNum1(newNum1);
    setNum2(newNum2);
    setUserAnswer("");
  };

  const checkAnswer = () => {
    let correctAnswer;
    switch (operation) {
      case "+":
        correctAnswer = num1 + num2;
        break;
      case "-":
        correctAnswer = num1 - num2;
        break;
      case "*":
        correctAnswer = num1 * num2;
        break;
    }

    if (parseInt(userAnswer) === correctAnswer) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "Keep going!",
        className: "bg-green-500 text-white",
      });
      generateProblem();
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer was ${correctAnswer}`,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    generateProblem();
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
    <div className="min-h-screen bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-6">
      <Button variant="outline" onClick={onBack} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      <Card className="max-w-lg mx-auto p-6 backdrop-blur-lg bg-white/90">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">Speed Math Challenge</h2>
          <div className="flex justify-between text-lg">
            <span>Score: {score}</span>
            <span>Time: {timeLeft}s</span>
          </div>
        </div>

        <div className="text-4xl text-center mb-8">
          {num1} {operation} {num2} = ?
        </div>

        <div className="flex gap-4">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
            className="flex-1 p-4 text-2xl text-center border rounded-lg"
            placeholder="Your answer"
            disabled={timeLeft === 0}
          />
          <Button 
            onClick={checkAnswer}
            className="text-xl px-8"
            disabled={!userAnswer || timeLeft === 0}
          >
            Submit
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SpeedMathGame;