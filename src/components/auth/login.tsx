import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';
import { GoogleAuthModal } from './google-auth-modal';

interface LoginProps {
  onNavigate: (screen: string) => void;
  onLogin: (user?: any) => void;
}

export function Login({ onNavigate, onLogin }: LoginProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleAuthError, setGoogleAuthError] = useState('');

  // Registered Gmail users list
  const registeredUsers = [
    'john.doe@gmail.com',
    'jane.smith@gmail.com',
    'test.user@gmail.com',
    'demo.user@gmail.com',
    'parkeasy.demo@gmail.com'
  ];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasValidDomain = email.includes('.com') || email.includes('.org') || email.includes('.net') || email.includes('.edu') || email.includes('.gov');
    return emailRegex.test(email) && hasValidDomain;
  };

  const validateGmailRegistration = (email: string): boolean => {
    // Check if email ends with @gmail.com
    if (!email.toLowerCase().endsWith('@gmail.com')) {
      return false;
    }
    
    // Check if email exists in registered users list
    if (!registeredUsers.includes(email.toLowerCase())) {
      return false;
    }
    
    return true;
  };

  const validatePassword = (password: string): boolean => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const minLength = password.length >= 8;
    
    return hasUppercase && hasLowercase && hasNumbers && hasSpecialChar && minLength;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // On invalid user, render red error text and red border; do not navigate
  const handleSubmit = async () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateGmailRegistration(formData.email)) {
      newErrors.email = 'User not registered';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, numbers, special characters and be at least 8 characters long';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        // Dummy authentication logic
        if (formData.email && formData.password) {
          onLogin();
        }
      }, 1000);
    }
  };

  const handleGoogleLogin = () => {
    setGoogleAuthError(''); // Clear any previous errors
    setShowGoogleModal(true);
  };

  const handleGoogleAccountSelect = (user: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(user);
    }, 500);
  };

  const handleGoogleModalClose = () => {
    setShowGoogleModal(false);
    setGoogleAuthError('Authentication cancelled, try again');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar */}
      <div className="bg-primary px-4 py-2 flex justify-between items-center text-white">
        <span>20:34</span>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white/50 rounded-full"></div>
            </div>
            B.
          </span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2 border border-white rounded-sm">
              <div className="w-3 h-1 bg-white rounded-sm"></div>
            </div>
            <span>43</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-primary text-white px-6 py-8 rounded-b-3xl">
        <h1 className="text-2xl font-medium mb-2">Welcome Back</h1>
        <p className="text-blue-100">Sign in to your ParkEasy account</p>
      </div>

      {/* Login Form */}
      <div className="px-6 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="mt-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`bg-gray-50 h-12 ${errors.email ? 'border-red-500 border-2' : 'border-0'}`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`bg-gray-50 border-0 h-12 pr-12 ${errors.password ? 'ring-2 ring-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
                  }
                />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </Label>
              </div>
              <button
                type="button"
                className="text-sm text-primary hover:underline"
                onClick={() => {
                  // Handle forgot password - could show alert or navigate to forgot password screen
                  alert('Forgot password functionality would be implemented here');
                }}
              >
                Forgot Password?
              </button>
            </div>

            {/* Sign In Button */}
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 h-12 rounded-xl"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Google Sign In */}
            <Button
              variant="outline"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full h-12 rounded-xl border-gray-200 hover:bg-gray-50"
            >
              <div className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </div>
            </Button>
            
            {/* Google Auth Error */}
            {googleAuthError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{googleAuthError}</p>
              </div>
            )}

            {/* Sign Up Link */}
            <div className="text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <button
                onClick={() => onNavigate('register')}
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Google Auth Modal */}
      <GoogleAuthModal
        isOpen={showGoogleModal}
        onClose={handleGoogleModalClose}
        onLogin={handleGoogleAccountSelect}
      />
    </div>
  );
}