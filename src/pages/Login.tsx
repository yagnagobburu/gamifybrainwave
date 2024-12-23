import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "demo@example.com" && password === "password") {
      localStorage.setItem("isLoggedIn", "true");
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
      navigate("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid credentials. Try demo@example.com / password",
      });
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password && age && city) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userDetails", JSON.stringify({ name, email, age, city }));
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
      navigate("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-6 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            Welcome to NeuroQuest
          </h2>
          <p className="mt-2 text-gray-600">Join our learning adventure</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="demo@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Sign in
              </Button>

              <div className="mt-4 text-center text-sm text-gray-600">
                <p>Demo credentials:</p>
                <p>Email: demo@example.com</p>
                <p>Password: password</p>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="25"
                  required
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <Input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Your city"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;