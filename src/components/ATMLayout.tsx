import React from 'react';
import { Card } from "@/components/ui/card";

interface ATMLayoutProps {
  children: React.ReactNode;
}

export const ATMLayout: React.FC<ATMLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-2xl border-2 border-border bg-gradient-to-br from-card via-card to-muted relative overflow-hidden">
          {/* ATM Brand Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-primary to-banking-blue bg-clip-text text-transparent">
              <h1 className="text-3xl font-bold tracking-tight">CashConnect</h1>
              <p className="text-sm text-muted-foreground mt-1">ATM Services</p>
            </div>
          </div>
          
          {/* Screen Border Effect */}
          <div className="absolute inset-4 border border-primary/20 rounded-lg pointer-events-none opacity-30"></div>
          
          {children}
        </Card>
      </div>
    </div>
  );
};