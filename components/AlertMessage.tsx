
import React from 'react';

interface AlertMessageProps {
  message: string;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ message }) => {
  return (
    <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg flex items-start space-x-3" role="alert">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <div>
        <p className="font-medium">အမှားအယွင်း</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default AlertMessage;
