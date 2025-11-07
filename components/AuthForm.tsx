import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import AlertMessage from './AlertMessage';

const AuthForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { loading, signInWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-amber-400 mb-6 text-center">Sign In</h2>
      {error && <AlertMessage message={error} />}
      <div className="mt-4 text-center">
        <button
          onClick={handleGoogleSignIn}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center"
          disabled={loading}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.24 10.24v3.52h6.08c-.24 1.44-.96 2.64-2.08 3.52l-.08.08-2.88 2.24-.16.16c-1.76 1.36-4 2.16-6.4 2.16-5.28 0-9.6-4.32-9.6-9.6s4.32-9.6 9.6-9.6c2.88 0 5.28 1.04 7.2 2.88l2.08-2.08c-2.4-2.24-5.6-3.68-9.28-3.68-7.2 0-13.12 5.28-13.12 12s5.92 12 13.12 12c7.2 0 12.48-5.28 12.48-11.68 0-.8-.08-1.52-.24-2.24h-12.24z"/>
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
