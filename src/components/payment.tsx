import { useState } from "react";
import { ArrowLeft, CreditCard, Plus, Shield, Lock, Smartphone, Wallet, QrCode } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { PinValidationPopup } from "./pin-validation-popup";

interface PaymentProps {
  onNavigate: (screen: string) => void;
  reservationData?: {
    spot: any;
    date: string;
    time: string;
    duration: string;
    totalCost: number;
  };
}

export function Payment({ onNavigate, reservationData }: PaymentProps) {
  const paymentMethods = [
    {
      id: 1,
      type: "Visa",
      last4: "4242",
      expiry: "12/26",
      isDefault: true
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "8888",
      expiry: "09/27",
      isDefault: false
    }
  ];

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>({ ...paymentMethods[0], methodType: 'cards' });
  const [showPinPopup, setShowPinPopup] = useState(false);
  const [activeTab, setActiveTab] = useState("cards");

  const handlePaymentMethodSelect = (method: any, type: string) => {
    setSelectedPaymentMethod({ ...method, methodType: type });
  };

  const handlePayButtonClick = () => {
    if (!selectedPaymentMethod) {
      // Default to first card if none selected
      setSelectedPaymentMethod({ ...paymentMethods[0], methodType: 'cards' });
    }
    setShowPinPopup(true);
  };

  const handlePinSuccess = () => {
    setShowPinPopup(false);
    onNavigate('confirmation');
  };

  const getSelectedPaymentForPin = () => {
    if (!selectedPaymentMethod) return { type: 'Visa', last4: '4242' };
    
    if (selectedPaymentMethod.methodType === 'cards') {
      return {
        type: selectedPaymentMethod.type,
        last4: selectedPaymentMethod.last4
      };
    } else if (selectedPaymentMethod.methodType === 'upi') {
      return {
        type: 'UPI',
        name: selectedPaymentMethod.name || 'john.doe@paytm'
      };
    } else if (selectedPaymentMethod.methodType === 'wallets') {
      return {
        type: 'Wallet',
        name: selectedPaymentMethod.name
      };
    }
    
    return { type: 'Visa', last4: '4242' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1B1F73] text-white p-4 pt-12">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => onNavigate('spot-details')}
            className="mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl">Payment</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Booking Summary */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Booking Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">{reservationData?.spot?.name || 'Downtown Plaza'}</span>
              <span className="font-medium">{reservationData?.spot?.id || 'Spot A-23'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time</span>
              <span className="font-medium">
                {reservationData?.date && reservationData?.time 
                  ? `${new Date(reservationData.date).toLocaleDateString()}, ${reservationData.time}`
                  : 'Sep 9, 2:00 PM - 6:00 PM'
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration</span>
              <span className="font-medium">
                {reservationData?.duration ? `${reservationData.duration} hour${parseInt(reservationData.duration) > 1 ? 's' : ''}` : '4 hours'}
              </span>
            </div>
          </div>
        </Card>

        {/* Payment Methods */}
        <div>
          <h3 className="font-medium mb-3">Choose Payment Method</h3>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="upi">UPI</TabsTrigger>
              <TabsTrigger value="wallets">Wallets</TabsTrigger>
            </TabsList>
            
            <TabsContent value="cards" className="space-y-3 mt-4">
              <div className="flex justify-end mb-2">
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Card
                </Button>
              </div>
              {paymentMethods.map((method) => (
                <Card 
                  key={method.id} 
                  onClick={() => handlePaymentMethodSelect(method, 'cards')}
                  className={`p-4 cursor-pointer border-2 transition-colors ${
                    selectedPaymentMethod?.id === method.id && selectedPaymentMethod?.methodType === 'cards'
                      ? 'border-[#1B1F73] bg-blue-50/50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{method.type} ••••{method.last4}</p>
                        <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                      </div>
                    </div>
                    {selectedPaymentMethod?.id === method.id && selectedPaymentMethod?.methodType === 'cards' && (
                      <Badge className="bg-[#1B1F73] text-white">Selected</Badge>
                    )}
                  </div>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="upi" className="space-y-3 mt-4">
              <Card 
                onClick={() => handlePaymentMethodSelect({ name: 'QR Code', type: 'upi-qr' }, 'upi')}
                className={`p-4 cursor-pointer border-2 transition-colors ${
                  selectedPaymentMethod?.name === 'QR Code' && selectedPaymentMethod?.methodType === 'upi'
                    ? 'border-[#1B1F73] bg-blue-50/50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#1B1F73] rounded-lg flex items-center justify-center">
                      <QrCode className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Scan QR Code</p>
                      <p className="text-sm text-gray-500">Pay using any UPI app</p>
                    </div>
                  </div>
                  {selectedPaymentMethod?.name === 'QR Code' && selectedPaymentMethod?.methodType === 'upi' && (
                    <Badge className="bg-[#1B1F73] text-white">Selected</Badge>
                  )}
                </div>
              </Card>
              
              <div className="text-center text-gray-500">or</div>
              
              <Card 
                onClick={() => handlePaymentMethodSelect({ name: 'john.doe@paytm', type: 'upi-id' }, 'upi')}
                className={`p-4 cursor-pointer border-2 transition-colors ${
                  selectedPaymentMethod?.name === 'john.doe@paytm' && selectedPaymentMethod?.methodType === 'upi'
                    ? 'border-[#1B1F73] bg-blue-50/50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">john.doe@paytm</p>
                      <p className="text-sm text-gray-500">Linked UPI ID</p>
                    </div>
                  </div>
                  {selectedPaymentMethod?.name === 'john.doe@paytm' && selectedPaymentMethod?.methodType === 'upi' && (
                    <Badge className="bg-[#1B1F73] text-white">Selected</Badge>
                  )}
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="wallets" className="space-y-3 mt-4">
              {[
                { name: "PayTM Wallet", balance: "$125.50", icon: "💰" },
                { name: "Google Pay", balance: "Not linked", icon: "💳" },
                { name: "PhonePe", balance: "$89.20", icon: "📱" }
              ].map((wallet, index) => (
                <Card 
                  key={index}
                  onClick={() => wallet.balance !== "Not linked" && handlePaymentMethodSelect(wallet, 'wallets')}
                  className={`p-4 transition-colors ${
                    wallet.balance !== "Not linked" 
                      ? `cursor-pointer border-2 ${
                          selectedPaymentMethod?.name === wallet.name && selectedPaymentMethod?.methodType === 'wallets'
                            ? 'border-[#1B1F73] bg-blue-50/50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`
                      : 'border border-gray-100 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">{wallet.icon}</span>
                      </div>
                      <div>
                        <p className="font-medium">{wallet.name}</p>
                        <p className={`text-sm ${
                          wallet.balance === "Not linked" 
                            ? 'text-gray-400' 
                            : 'text-green-600'
                        }`}>
                          Balance: {wallet.balance}
                        </p>
                      </div>
                    </div>
                    {wallet.balance === "Not linked" ? (
                      <Button variant="outline" size="sm">Link</Button>
                    ) : (
                      selectedPaymentMethod?.name === wallet.name && selectedPaymentMethod?.methodType === 'wallets' && (
                        <Badge className="bg-[#1B1F73] text-white">Selected</Badge>
                      )
                    )}
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Price Breakdown */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Price Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">
                Base Rate ({reservationData?.duration || '4'} hour{parseInt(reservationData?.duration || '4') > 1 ? 's' : ''})
              </span>
              <span>₹{(reservationData?.totalCost || 32).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Service Fee</span>
              <span>₹{((reservationData?.totalCost || 32) * 0.05).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span>₹0.00</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-lg font-medium">
              <span>Total</span>
              <span className="text-[#1B1F73]">₹{((reservationData?.totalCost || 32) * 1.05).toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Security Notice */}
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-green-800">Secure Payment</p>
              <p className="text-sm text-green-700">Your payment information is encrypted and secure</p>
            </div>
          </div>
        </Card>

        {/* Pay Button */}
        <div className="pb-20">
          <Button 
            onClick={handlePayButtonClick}
            className="w-full bg-[#1B1F73] hover:bg-[#1B1F73]/90 h-12"
          >
            <Lock className="w-5 h-5 mr-2" />
            Pay ₹{((reservationData?.totalCost || 32) * 1.05).toFixed(2)}
          </Button>
        </div>
      </div>

      {/* PIN Validation Popup */}
      <PinValidationPopup
        isOpen={showPinPopup}
        onClose={() => setShowPinPopup(false)}
        onSuccess={handlePinSuccess}
        paymentMethod={getSelectedPaymentForPin()}
      />
    </div>
  );
}