import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bot, Eye, EyeOff } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      setLoading(true);
      await register({ email, password });
      navigate('/');
    } catch {
      setError('Unable to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-surface relative flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center gap-2 mb-3">
          <Bot className="text-accent" size={20} />
          <span className="text-sm text-subtle">Verdict</span>
        </div>

        <h1 className="text-xl font-semibold text-fg">Create account</h1>
        <p className="text-sm text-muted mt-1">
          Start comparing AI responses with clarity.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="w-full px-3 py-2 rounded-md border border-border bg-card text-fg text-sm outline-none focus:border-subtle"
            disabled={loading}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              className="w-full px-3 py-2 pr-10 rounded-md border border-border bg-card text-fg text-sm outline-none focus:border-subtle"
              disabled={loading}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-fg"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error ? <p className="text-xs text-red-500">{error}</p> : null}

          <Button type="submit" className="w-full font-medium" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>

        <div className="text-xs text-muted mt-4 border border-border rounded-md p-3 bg-muted-bg/40 space-y-1">
          <p>• Compare multiple AI responses side-by-side</p>
          <p>• Get structured evaluation instantly</p>
          <p>• Save and revisit your past comparisons</p>
        </div>

        <p className="text-sm text-muted mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-fg underline underline-offset-2">
            Login
          </Link>
        </p>

        <p className="text-[11px] text-muted mt-4 text-center">
          Your data is private. Only you can access your saved comparisons.
        </p>
      </Card>
    </div>
  );
}
