import React, { useState } from 'react';
import { ATMLayout } from "@/components/ATMLayout";
import { PinEntry } from "@/components/PinEntry";
import { ATMMain } from "@/components/ATMMain";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthenticate = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <ATMLayout>
      {!isAuthenticated ? (
        <PinEntry onAuthenticate={handleAuthenticate} />
      ) : (
        <ATMMain onLogout={handleLogout} />
      )}
    </ATMLayout>
  );
};

export default Index;
