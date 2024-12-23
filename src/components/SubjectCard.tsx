import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Brain, Calculator, Flask } from "lucide-react";

interface SubjectCardProps {
  subject: "math" | "chemistry" | "reasoning";
  onClick: () => void;
}

const SubjectCard = ({ subject, onClick }: SubjectCardProps) => {
  const subjectConfig = {
    math: {
      title: "Mathematics",
      description: "Master arithmetic through fun challenges",
      icon: Calculator,
      gradient: "from-blue-500 to-blue-700",
    },
    chemistry: {
      title: "Chemistry",
      description: "Explore the world of elements and reactions",
      icon: Flask,
      gradient: "from-pink-500 to-pink-700",
    },
    reasoning: {
      title: "Reasoning",
      description: "Sharpen your logical thinking skills",
      icon: Brain,
      gradient: "from-purple-500 to-purple-700",
    },
  };

  const config = subjectConfig[subject];

  return (
    <Card
      className={cn(
        "group relative overflow-hidden p-6 transition-all hover:scale-105 cursor-pointer animate-float",
        "bg-gradient-to-br",
        config.gradient
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity group-hover:opacity-100" />
      <config.icon className="h-12 w-12 text-white mb-4" />
      <h3 className="text-2xl font-bold text-white mb-2">{config.title}</h3>
      <p className="text-white/90">{config.description}</p>
    </Card>
  );
};

export default SubjectCard;