import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, DollarSign, ArrowUpCircle, ArrowDownCircle, LogOut, Receipt } from "lucide-react";

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'balance';
  amount?: number;
  balance: number;
  timestamp: Date;
}

interface ATMMainProps {
  onLogout: () => void;
}

export const ATMMain: React.FC<ATMMainProps> = ({ onLogout }) => {
  const [balance, setBalance] = useState(1000);
  const [amount, setAmount] = useState('');
  const [view, setView] = useState<'menu' | 'deposit' | 'withdraw' | 'balance' | 'history'>('menu');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { toast } = useToast();

  const addTransaction = (type: Transaction['type'], amount?: number) => {
    const transaction: Transaction = {
      id: Date.now().toString(),
      type,
      amount,
      balance,
      timestamp: new Date(),
    };
    setTransactions(prev => [transaction, ...prev.slice(0, 9)]);
  };

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    if (depositAmount > 0) {
      setBalance(prev => prev + depositAmount);
      addTransaction('deposit', depositAmount);
      toast({
        title: "Deposit Successful",
        description: `$${depositAmount.toFixed(2)} deposited successfully`,
        variant: "default",
      });
      setAmount('');
      setView('menu');
    }
  };

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    if (withdrawAmount > 0 && withdrawAmount <= balance) {
      setBalance(prev => prev - withdrawAmount);
      addTransaction('withdraw', withdrawAmount);
      toast({
        title: "Withdrawal Successful",
        description: `$${withdrawAmount.toFixed(2)} withdrawn successfully`,
        variant: "default",
      });
      setAmount('');
      setView('menu');
    } else if (withdrawAmount > balance) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough balance for this withdrawal",
        variant: "destructive",
      });
    }
  };

  const handleCheckBalance = () => {
    addTransaction('balance');
    setView('balance');
  };

  const renderMenu = () => (
    <div className="animate-slide-up space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">Select Transaction</h2>
        <p className="text-muted-foreground">Choose an option below</p>
      </div>
      
      <div className="grid gap-3">
        <Button
          onClick={handleCheckBalance}
          variant="outline"
          size="lg"
          className="h-16 justify-start gap-4 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
        >
          <DollarSign className="h-6 w-6" />
          <div className="text-left">
            <div className="font-semibold">Check Balance</div>
            <div className="text-sm opacity-70">View account balance</div>
          </div>
        </Button>
        
        <Button
          onClick={() => setView('deposit')}
          variant="outline"
          size="lg"
          className="h-16 justify-start gap-4 hover:bg-secondary hover:text-secondary-foreground transition-all duration-200"
        >
          <ArrowUpCircle className="h-6 w-6" />
          <div className="text-left">
            <div className="font-semibold">Deposit Money</div>
            <div className="text-sm opacity-70">Add funds to account</div>
          </div>
        </Button>
        
        <Button
          onClick={() => setView('withdraw')}
          variant="outline"
          size="lg"
          className="h-16 justify-start gap-4 hover:bg-destructive hover:text-destructive-foreground transition-all duration-200"
        >
          <ArrowDownCircle className="h-6 w-6" />
          <div className="text-left">
            <div className="font-semibold">Withdraw Money</div>
            <div className="text-sm opacity-70">Take cash from account</div>
          </div>
        </Button>
        
        <Button
          onClick={() => setView('history')}
          variant="outline"
          size="lg"
          className="h-16 justify-start gap-4 hover:bg-accent hover:text-accent-foreground transition-all duration-200"
        >
          <Receipt className="h-6 w-6" />
          <div className="text-left">
            <div className="font-semibold">Transaction History</div>
            <div className="text-sm opacity-70">View recent transactions</div>
          </div>
        </Button>
      </div>
      
      <Separator className="my-4" />
      
      <Button
        onClick={onLogout}
        variant="secondary"
        size="lg"
        className="w-full gap-2"
      >
        <LogOut className="h-4 w-4" />
        Exit ATM
      </Button>
    </div>
  );

  const renderTransaction = (type: 'deposit' | 'withdraw') => (
    <div className="animate-slide-up space-y-4">
      <Button
        onClick={() => setView('menu')}
        variant="ghost"
        className="mb-4"
      >
        ← Back to Menu
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle className={`text-xl ${type === 'deposit' ? 'text-secondary' : 'text-destructive'}`}>
            {type === 'deposit' ? 'Deposit Money' : 'Withdraw Money'}
          </CardTitle>
          <CardDescription>
            Current Balance: <span className="font-semibold">${balance.toFixed(2)}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="text-lg"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {[20, 50, 100, 200, 500, 1000].map((preset) => (
              <Button
                key={preset}
                variant="outline"
                size="sm"
                onClick={() => setAmount(preset.toString())}
              >
                ${preset}
              </Button>
            ))}
          </div>
          
          <Button
            onClick={type === 'deposit' ? handleDeposit : handleWithdraw}
            className={`w-full ${type === 'deposit' 
              ? 'bg-gradient-to-r from-secondary to-banking-green hover:from-secondary/90 hover:to-banking-green/90' 
              : 'bg-gradient-to-r from-destructive to-banking-red hover:from-destructive/90 hover:to-banking-red/90'
            }`}
            disabled={!amount || parseFloat(amount) <= 0}
          >
            {type === 'deposit' ? 'Deposit' : 'Withdraw'} ${amount || '0.00'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderBalance = () => (
    <div className="animate-slide-up space-y-4">
      <Button
        onClick={() => setView('menu')}
        variant="ghost"
        className="mb-4"
      >
        ← Back to Menu
      </Button>
      
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Account Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-foreground mb-4">
            ${balance.toFixed(2)}
          </div>
          <div className="flex items-center justify-center gap-2 text-secondary">
            <CheckCircle className="h-5 w-5" />
            <span>Balance updated successfully</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderHistory = () => (
    <div className="animate-slide-up space-y-4">
      <Button
        onClick={() => setView('menu')}
        variant="ghost"
        className="mb-4"
      >
        ← Back to Menu
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Transaction History</CardTitle>
          <CardDescription>Recent transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No transactions yet</p>
          ) : (
            <div className="space-y-2">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-2 rounded border">
                  <div className="flex items-center gap-2">
                    {transaction.type === 'deposit' && <ArrowUpCircle className="h-4 w-4 text-secondary" />}
                    {transaction.type === 'withdraw' && <ArrowDownCircle className="h-4 w-4 text-destructive" />}
                    {transaction.type === 'balance' && <DollarSign className="h-4 w-4 text-primary" />}
                    <span className="text-sm">
                      {transaction.type === 'balance' ? 'Balance Check' : 
                       transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                    </span>
                  </div>
                  <div className="text-right text-sm">
                    {transaction.amount && (
                      <div className={transaction.type === 'deposit' ? 'text-secondary' : 'text-destructive'}>
                        {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </div>
                    )}
                    <div className="text-muted-foreground">
                      {transaction.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div>
      {view === 'menu' && renderMenu()}
      {view === 'deposit' && renderTransaction('deposit')}
      {view === 'withdraw' && renderTransaction('withdraw')}
      {view === 'balance' && renderBalance()}
      {view === 'history' && renderHistory()}
    </div>
  );
};