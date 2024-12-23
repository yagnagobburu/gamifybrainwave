import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";

interface CrissCrossPuzzleProps {
  onBack: () => void;
}

const puzzles = [
  {
    grid: [
      ["1", "", "2", "", ""],
      ["", "*", "", "*", ""],
      ["3", "", "", "", ""],
      ["", "*", "", "*", ""],
      ["4", "", "", "", ""],
    ],
    clues: {
      across: {
        "1": "Logical thinking process",
        "3": "To solve a problem",
        "4": "Mental exercise",
      },
      down: {
        "1": "Clear and orderly thinking",
        "2": "Process of finding a solution",
      },
    },
    answers: {
      across: {
        "1": "REASON",
        "3": "DEDUCE",
        "4": "PUZZLE",
      },
      down: {
        "1": "RATIO",
        "2": "SOLVE",
      },
    },
  },
];

const CrissCrossPuzzle = ({ onBack }: CrissCrossPuzzleProps) => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [direction, setDirection] = useState<"across" | "down">("across");
  const { toast } = useToast();

  const puzzle = puzzles[currentPuzzle];

  const handleCellClick = (row: number, col: number) => {
    if (puzzle.grid[row][col] === "*") return;
    
    if (selectedCell && selectedCell[0] === row && selectedCell[1] === col) {
      setDirection(direction === "across" ? "down" : "across");
    }
    setSelectedCell([row, col]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!selectedCell) return;
    
    const [row, col] = selectedCell;
    if (e.key.match(/^[a-zA-Z]$/)) {
      const newAnswers = { ...userAnswers };
      newAnswers[`${row}-${col}`] = e.key.toUpperCase();
      setUserAnswers(newAnswers);
      
      // Move to next cell
      if (direction === "across" && col < 4) {
        setSelectedCell([row, col + 1]);
      } else if (direction === "down" && row < 4) {
        setSelectedCell([row + 1, col]);
      }
    } else if (e.key === "Backspace") {
      const newAnswers = { ...userAnswers };
      delete newAnswers[`${row}-${col}`];
      setUserAnswers(newAnswers);
    }
  };

  const checkAnswers = () => {
    let correct = true;
    let filledCells = 0;
    let totalCells = 0;

    // Check across answers
    Object.entries(puzzle.answers.across).forEach(([number, answer]) => {
      const row = puzzle.grid.findIndex(r => r.includes(number));
      const col = puzzle.grid[row].indexOf(number);
      
      for (let i = 0; i < answer.length; i++) {
        totalCells++;
        const userAnswer = userAnswers[`${row}-${col + i}`];
        if (!userAnswer) {
          correct = false;
        } else if (userAnswer !== answer[i]) {
          correct = false;
        }
        if (userAnswer) filledCells++;
      }
    });

    // Check down answers
    Object.entries(puzzle.answers.down).forEach(([number, answer]) => {
      const row = puzzle.grid.findIndex(r => r.includes(number));
      const col = puzzle.grid[row].indexOf(number);
      
      for (let i = 0; i < answer.length; i++) {
        if (!puzzle.grid[row + i][col].includes("*")) {
          totalCells++;
          const userAnswer = userAnswers[`${row + i}-${col}`];
          if (!userAnswer) {
            correct = false;
          } else if (userAnswer !== answer[i]) {
            correct = false;
          }
          if (userAnswer) filledCells++;
        }
      }
    });

    if (filledCells < totalCells) {
      toast({
        title: "Incomplete",
        description: "Please fill in all cells before checking",
        variant: "destructive",
      });
      return;
    }

    if (correct) {
      toast({
        title: "Congratulations!",
        description: "You solved the puzzle correctly!",
        className: "bg-green-500 text-white",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Some answers are wrong. Try again!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-6">
      <Button variant="outline" onClick={onBack} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      <Card className="max-w-4xl mx-auto p-6 backdrop-blur-lg bg-white/90">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-4">Logic Criss-Cross</h2>
          <p className="text-gray-600 mb-6">Fill in the puzzle using the clues below</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="grid grid-cols-5 gap-1 mb-6" onKeyDown={handleKeyPress} tabIndex={0}>
              {puzzle.grid.map((row, rowIndex) => (
                row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`
                      w-12 h-12 border-2 flex items-center justify-center relative cursor-pointer
                      ${cell === "*" ? "bg-gray-900" : "bg-white"}
                      ${selectedCell && selectedCell[0] === rowIndex && selectedCell[1] === colIndex
                        ? "border-blue-500"
                        : "border-gray-300"}
                    `}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {cell === "*" ? "" : (
                      <>
                        {cell && <span className="absolute top-0 left-1 text-xs">{cell}</span>}
                        <span className="text-xl font-bold">
                          {userAnswers[`${rowIndex}-${colIndex}`] || ""}
                        </span>
                      </>
                    )}
                  </div>
                ))
              ))}
            </div>
            <Button onClick={checkAnswers} className="w-full">Check Answers</Button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Across</h3>
              <ul className="space-y-2">
                {Object.entries(puzzle.clues.across).map(([number, clue]) => (
                  <li key={`across-${number}`}>
                    <span className="font-bold">{number}.</span> {clue}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Down</h3>
              <ul className="space-y-2">
                {Object.entries(puzzle.clues.down).map(([number, clue]) => (
                  <li key={`down-${number}`}>
                    <span className="font-bold">{number}.</span> {clue}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CrissCrossPuzzle;