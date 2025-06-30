
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Music } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (login(username, password)) {
      console.log('Login successful');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleDemoLogin = (role: 'admin' | 'user') => {
    if (role === 'admin') {
      setUsername('admin');
      setPassword('admin123');
      login('admin', 'admin123');
    } else {
      setUsername('user');
      setPassword('user123');
      login('user', 'user123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full music-gradient mb-4">
            <Music size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            MusicHub
          </h1>
          <p className="text-muted-foreground mt-2">
            Sign in to access your music library
          </p>
        </div>

        <Card className="glass-effect">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access the music library
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              {error && (
                <div className="text-destructive text-sm">{error}</div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button type="submit" className="w-full music-gradient">
                Sign In
              </Button>
              <div className="flex space-x-2 w-full">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleDemoLogin('admin')}
                >
                  Demo Admin
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleDemoLogin('user')}
                >
                  Demo User
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-6 p-4 glass-effect rounded-lg">
          <h3 className="font-semibold mb-2">Demo Credentials:</h3>
          <div className="text-sm space-y-1 text-muted-foreground">
            <div><strong>Admin:</strong> username: admin, password: admin123</div>
            <div><strong>User:</strong> username: user, password: user123</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
