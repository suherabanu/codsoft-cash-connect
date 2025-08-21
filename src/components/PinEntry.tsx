import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface PinEntryProps {
  onAuthenticate: () => void;
}

export const PinEntry: React.FC<PinEntryProps> = ({ onAuthenticate }) => {
  const [pin, setPin] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') {
      toast({
        title: "Authentication Successful",
        description: "Welcome to CashConnect ATM",
        variant: "default",
      });
      onAuthenticate();
    } else {
      toast({
        title: "Authentication Failed",
        description: "Invalid PIN. Please try again.",
        variant: "destructive",
      });
      setPin('');
    }
  };

  const addDigit = (digit: string) => {
    if (pin.length < 4) {
      setPin(prev => prev + digit);
    }
  };

  const clearPin = () => {
    setPin('');
  };

  return (
    <div className="animate-slide-up">
      <Card className="border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-primary">Enter Your PIN</CardTitle>
          <CardDescription>Enter your 4-digit PIN to access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type="password"
                value={pin}
                readOnly
                placeholder="••••"
                className="text-center text-2xl tracking-[0.5em] bg-muted"
              />
            </div>
            
            {/* PIN Keypad */}
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <Button
                  key={num}
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => addDigit(num.toString())}
                  className="h-12 text-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {num}
                </Button>
              ))}
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={clearPin}
                className="h-12 hover:bg-destructive hover:text-destructive-foreground"
              >
                Clear
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => addDigit('0')}
                className="h-12 text-lg hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                0
              </Button>
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="h-12 bg-gradient-to-r from-primary to-banking-blue hover:from-primary/90 hover:to-banking-blue/90"
                disabled={pin.length !== 4}
              >
                Enter
              </Button>
            </div>
          </form>
          
          <div className="text-center text-xs text-muted-foreground">
            Demo PIN: 1234
          </div>
        </CardContent>
      </Card>
    </div>
  );
};