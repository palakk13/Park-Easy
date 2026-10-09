import { useState } from 'react';
import { X } from 'lucide-react';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
}

const dummyAccounts = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    avatar: 'JD',
    avatarColor: 'bg-[#1B1F73]'
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@gmail.com',
    avatar: 'SW',
    avatarColor: 'bg-green-600'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@gmail.com',
    avatar: 'MJ',
    avatarColor: 'bg-[#1B1F73]'
  }
];

export function GoogleAuthModal({ isOpen, onClose, onLogin }: GoogleAuthModalProps) {
  if (!isOpen) return null;

  const handleAccountSelect = (account: any) => {
    // Simulate a brief loading state
    setTimeout(() => {
      onLogin(account);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-xl max-w-sm w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex-1 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-xl text-gray-700">Google</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="text-center mb-6">
            <h2 className="text-xl text-gray-900 mb-2">Sign in</h2>
            <p className="text-gray-600">Choose an account to continue to ParkEasy</p>
          </div>

          {/* Account List */}
          <div className="space-y-3">
            {dummyAccounts.map((account) => (
              <button
                key={account.id}
                onClick={() => handleAccountSelect(account)}
                className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-200"
              >
                <div className={`w-10 h-10 ${account.avatarColor} rounded-full flex items-center justify-center text-white font-medium`}>
                  {account.avatar}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900">{account.name}</div>
                  <div className="text-sm text-gray-600">{account.email}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Additional Options */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button className="w-full text-left p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-xl">+</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Use another account</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}