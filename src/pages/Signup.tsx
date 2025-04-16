
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';

const Signup = () => {
  const navigate = useNavigate();
  const { signup, loading } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // Password validation
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const passwordsMatch = password === confirmPassword;
  
  const canSubmit = name && email && password && 
                   hasMinLength && hasUpperCase && hasNumber && 
                   passwordsMatch && acceptTerms;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canSubmit) return;
    
    try {
      await signup(name, email, password, phone);
      navigate('/');
    } catch (error) {
      // Error handling is done in the Auth context
      console.error('Signup failed:', error);
    }
  };
  
  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-travel-600 hover:text-travel-500">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="mt-1">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email address</Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number (optional)</Label>
                <div className="mt-1">
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="mt-1 relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex items-center">
                    {hasMinLength ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="h-4 w-4 text-gray-300 mr-2" />
                    )}
                    <span className={hasMinLength ? 'text-green-600' : 'text-gray-500'}>
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center">
                    {hasUpperCase ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="h-4 w-4 text-gray-300 mr-2" />
                    )}
                    <span className={hasUpperCase ? 'text-green-600' : 'text-gray-500'}>
                      At least one uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center">
                    {hasNumber ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="h-4 w-4 text-gray-300 mr-2" />
                    )}
                    <span className={hasNumber ? 'text-green-600' : 'text-gray-500'}>
                      At least one number
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="mt-1">
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {confirmPassword && !passwordsMatch && (
                  <p className="mt-1 text-sm text-red-500">
                    Passwords do not match
                  </p>
                )}
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => 
                    setAcceptTerms(checked === true)
                  }
                  required
                />
                <Label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-900"
                >
                  I agree to the{' '}
                  <a
                    href="#"
                    className="font-medium text-travel-600 hover:text-travel-500"
                  >
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a
                    href="#"
                    className="font-medium text-travel-600 hover:text-travel-500"
                  >
                    Privacy Policy
                  </a>
                </Label>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!canSubmit || loading}
                >
                  {loading ? 'Creating account...' : 'Sign up'}
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or sign up with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M12.0001 4.3999C13.687 4.3999 15.2196 5.0212 16.4 6.1216L20.0208 2.5008C17.9599 0.5904 15.1359 -0.4848 12.0001 -0.4848C7.4623 -0.4848 3.5447 2.0472 1.6959 5.7127L5.8151 8.7847C6.7287 6.2 9.1551 4.3999 12.0001 4.3999Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.07 18.1L20.09 21.1C22.38 19 23.49 15.92 23.49 12.275Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M5.8149 15.215C5.5401 14.485 5.3799 13.7 5.3799 12.875C5.3799 12.05 5.5401 11.265 5.8149 10.535L1.6957 7.4625C0.8101 9.095 0.2999 10.93 0.2999 12.875C0.2999 14.82 0.8101 16.655 1.6957 18.2875L5.8149 15.215Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.0001 25.5C15.1359 25.5 17.7599 24.545 19.8101 22.69L15.7909 19.69C14.7273 20.3895 13.4411 20.75 12.0001 20.75C9.1551 20.75 6.7287 18.95 5.8151 16.365L1.6959 19.4375C3.5447 23.1025 7.4623 25.5 12.0001 25.5Z"
                      fill="#34A853"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                >
                  <span className="sr-only">Sign in with Facebook</span>
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="#1877F2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
