import { ArrowLeft, CreditCard, Plus, MoreVertical, Shield, Check, Wallet, Smartphone } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface PaymentMethodsProps {
  onNavigate: (screen: string) => void;
}

export function PaymentMethods({ onNavigate }: PaymentMethodsProps) {
  const paymentMethods = [
    {
      id: '1',
      type: 'card',
      brand: 'visa',
      last4: '4532',
      cardHolder: 'John Doe',
      expiryDate: '12/27',
      isDefault: true,
      color: 'bg-gradient-to-r from-blue-600 to-blue-700'
    },
    {
      id: '2',
      type: 'card',
      brand: 'mastercard',
      last4: '8901',
      cardHolder: 'John Doe',
      expiryDate: '08/26',
      isDefault: false,
      color: 'bg-gradient-to-r from-gray-700 to-gray-800'
    },
    {
      id: '3',
      type: 'wallet',
      brand: 'paytm',
      name: 'Paytm Wallet',
      balance: '₹1,247',
      phone: '+91 98765 43210',
      isDefault: false,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500'
    },
    {
      id: '4',
      type: 'upi',
      brand: 'googlepay',
      name: 'Google Pay',
      upiId: 'john.doe@okaxis',
      isDefault: false,
      color: 'bg-gradient-to-r from-green-500 to-green-600'
    }
  ];

  const getBrandIcon = (brand: string) => {
    switch (brand) {
      case 'visa':
        return (
          <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
            <span className="text-blue-600 font-bold text-xs">VISA</span>
          </div>
        );
      case 'mastercard':
        return (
          <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
            <div className="flex -space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full opacity-80"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full opacity-80"></div>
            </div>
          </div>
        );
      case 'paytm':
        return (
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <Wallet className="w-4 h-4 text-blue-600" />
          </div>
        );
      case 'googlepay':
        return (
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <Smartphone className="w-4 h-4 text-green-600" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-gray-600" />
          </div>
        );
    }
  };

  const formatCardNumber = (last4: string) => {
    return `•••• •••• •••• ${last4}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1B1F73] text-white p-4 pt-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate('user-profile')}
              className="mr-3"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl">Payment Methods</h1>
              <p className="text-blue-200 text-sm">Manage your payment options</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Add New Payment Method */}
        <Button 
          className="w-full bg-[#1B1F73] hover:bg-[#1B1F73]/90 h-12 mb-6"
          onClick={() => alert('Add payment method coming soon')}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Payment Method
        </Button>

        {/* Payment Methods List */}
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <Card key={method.id} className="p-0 overflow-hidden">
              {method.type === 'card' ? (
                <div className={`${method.color} p-4 text-white relative`}>
                  <div className="flex justify-between items-start mb-6">
                    {getBrandIcon(method.brand)}
                    <button className="text-white/80 hover:text-white">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-lg tracking-wider font-mono">
                      {formatCardNumber(method.last4)}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-white/80 uppercase">Card Holder</p>
                        <p className="text-sm">{method.cardHolder}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/80 uppercase">Expires</p>
                        <p className="text-sm">{method.expiryDate}</p>
                      </div>
                    </div>
                  </div>
                  
                  {method.isDefault && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-green-500 text-white">
                        <Check className="w-3 h-3 mr-1" />
                        Default
                      </Badge>
                    </div>
                  )}
                </div>
              ) : method.type === 'wallet' ? (
                <div className={`${method.color} p-4 text-white relative`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      {getBrandIcon(method.brand)}
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-white/80">{method.phone}</p>
                      </div>
                    </div>
                    <button className="text-white/80 hover:text-white">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-white/80 uppercase">Available Balance</p>
                      <p className="text-xl font-bold">{method.balance}</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-white/20 text-white">
                        Wallet
                      </Badge>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`${method.color} p-4 text-white relative`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      {getBrandIcon(method.brand)}
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-white/80">{method.upiId}</p>
                      </div>
                    </div>
                    <button className="text-white/80 hover:text-white">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-white/80 uppercase">UPI ID</p>
                      <p className="text-sm">{method.upiId}</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-white/20 text-white">
                        UPI
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Card Actions */}
              <div className="p-4 bg-white">
                <div className="flex space-x-3">
                  {!method.isDefault && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 border-[#1B1F73] text-[#1B1F73] hover:bg-[#1B1F73]/5"
                    >
                      Set as Default
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Security Notice */}
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-800 mb-1">Secure Payments</h3>
              <p className="text-sm text-green-700">
                All payment information is encrypted and secured with industry-standard security protocols. 
                Your financial data is never stored on our servers.
              </p>
            </div>
          </div>
        </Card>

        {/* Transaction Limits */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Transaction Limits</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Daily Limit</span>
              <span className="font-medium">₹10,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Monthly Limit</span>
              <span className="font-medium">₹50,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current Usage (Daily)</span>
              <span className="font-medium text-green-600">₹234 / ₹10,000</span>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline"
              className="h-16 flex flex-col items-center space-y-1"
            >
              <CreditCard className="w-5 h-5" />
              <span className="text-sm">Add Card</span>
            </Button>
            <Button 
              variant="outline"
              className="h-16 flex flex-col items-center space-y-1"
            >
              <Wallet className="w-5 h-5" />
              <span className="text-sm">Link Wallet</span>
            </Button>
          </div>
        </Card>

        <div className="pb-20"></div>
      </div>
    </div>
  );
}