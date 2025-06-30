
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/LoginForm';
import MusicLibrary from '@/components/MusicLibrary';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {isAuthenticated ? <MusicLibrary /> : <LoginForm />}
    </div>
  );
};

export default Index;
