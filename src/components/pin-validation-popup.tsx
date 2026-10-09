import { useState } from 'react';
import { X, Lock, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface PinValidationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  paymentMethod: {
    type: string;
    last4?: string;
    name?: string;
  };
}

// Dummy PIN data for different payment methods
const DUMMY_PINS = {
  // Credit Cards (PIN by last 4 digits)
  '4242': '1234',
  '8888': '5678',
  // UPI IDs
  'john.doe@paytm': '9876',
  // Wallets
  'PayTM Wallet': '4321',
  'Google Pay': '6789',
  'PhonePe': '1357'
};

export function PinValidationPopup({ isOpen, onClose, onSuccess, paymentMethod }: PinValidationPopupProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const getPaymentMethodKey = () => {
    if (paymentMethod.last4) {
      return paymentMethod.last4;
    } else if (paymentMethod.name?.includes('john.doe@paytm')) {
      return 'john.doe@paytm';
    } else {
      return paymentMethod.name || paymentMethod.type;
    }
  };

  const handlePinSubmit = async () => {
    if (pin.length !== 4) {
      setError('PIN must be 4 digits');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const paymentKey = getPaymentMethodKey();
    const correctPin = DUMMY_PINS[paymentKey as keyof typeof DUMMY_PINS];

    if (pin === correctPin) {
      onSuccess();
    } else {
      setError('Incorrect PIN. Please try again.');
      setPin('');
    }

    setIsLoading(false);
  };

  const handlePinChange = (value: string) => {
    // Only allow numeric input and max 4 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 4);
    setPin(numericValue);
    if (error) setError('');
  };

  const getPaymentMethodDisplay = () => {
    if (paymentMethod.last4) {
      return `${paymentMethod.type} ••••${paymentMethod.last4}`;
    } else if (paymentMethod.name?.includes('@')) {
      return paymentMethod.name;
    } else {
      return paymentMethod.name || paymentMethod.type;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm mx-auto p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          disabled={isLoading}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#1B1F73] rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-lg font-medium mb-2">Enter PIN</h2>
          <p className="text-gray-600 text-sm">
            Please enter your PIN for
          </p>
          <p className="text-gray-800 font-medium text-sm">
            {getPaymentMethodDisplay()}
          </p>
        </div>

        {/* PIN Input */}
        <div className="mb-4 relative">
          <div 
            className="flex justify-center space-x-3 mb-4 cursor-pointer"
            onClick={() => document.getElementById('pin-input')?.focus()}
          >
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center text-xl font-medium transition-colors ${
                  pin.length > index
                    ? 'border-[#1B1F73] bg-blue-50 text-[#1B1F73]'
                    : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  document.getElementById('pin-input')?.focus();
                }}
              >
                {pin.length > index ? '•' : ''}
              </div>
            ))}
          </div>

          {/* Hidden input for PIN entry */}
          <input
            id="pin-input"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            value={pin}
            onChange={(e) => handlePinChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-default"
            maxLength={4}
            autoFocus
            disabled={isLoading}
            style={{ 
              zIndex: 10,
              fontSize: '16px', // Prevents zoom on iOS
              background: 'transparent',
              border: 'none',
              outline: 'none'
            }}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handlePinSubmit}
            disabled={pin.length !== 4 || isLoading}
            className="w-full bg-[#1B1F73] hover:bg-[#1B1F73]/90 h-12"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Verifying...</span>
              </div>
            ) : (
              'Confirm Payment'
            )}
          </Button>
          
          <Button
            onClick={onClose}
            variant="outline"
            disabled={isLoading}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}