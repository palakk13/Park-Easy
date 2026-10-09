import { CheckCircle, Calendar, MapPin, QrCode } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface ConfirmationProps {
  onNavigate: (screen: string) => void;
}

export function Confirmation({ onNavigate }: ConfirmationProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1B1F73] text-white p-4 pt-12">
        <h1 className="text-xl text-center">Booking Confirmed</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Success Message */}
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-medium text-gray-900 mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-600">
            Your parking spot has been reserved
          </p>
        </div>

        {/* Booking Details */}
        <Card className="p-4">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-500 mb-2">Booking Reference</p>
            <p className="text-lg font-medium text-[#1B1F73]">#PK2459</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="font-medium">Downtown Plaza</p>
                <p className="text-sm text-gray-500">123 Main Street, Downtown</p>
                <p className="text-sm text-gray-500">Spot: A-23 (Level 2)</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="font-medium">Tuesday, September 9, 2025</p>
                <p className="text-sm text-gray-500">2:00 PM - 6:00 PM (4 hours)</p>
              </div>
            </div>
          </div>
        </Card>

        {/* QR Code */}
        <Card className="p-6">
          <div className="text-center">
            <div className="w-32 h-32 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4 p-3">
              {/* Sample QR Code SVG */}
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" fill="white"/>
                <rect x="10" y="10" width="20" height="20" fill="black"/>
                <rect x="15" y="15" width="10" height="10" fill="white"/>
                <rect x="70" y="10" width="20" height="20" fill="black"/>
                <rect x="75" y="75" width="10" height="10" fill="white"/>
                <rect x="10" y="70" width="20" height="20" fill="black"/>
                <rect x="15" y="75" width="10" height="10" fill="white"/>
                <rect x="40" y="40" width="20" height="20" fill="black"/>
                <rect x="45" y="45" width="10" height="10" fill="white"/>
                <rect x="10" y="40" width="5" height="5" fill="black"/>
                <rect x="20" y="40" width="5" height="5" fill="black"/>
                <rect x="30" y="40" width="5" height="5" fill="black"/>
                <rect x="10" y="50" width="5" height="5" fill="black"/>
                <rect x="20" y="50" width="5" height="5" fill="black"/>
                <rect x="30" y="50" width="5" height="5" fill="black"/>
                <rect x="70" y="40" width="5" height="5" fill="black"/>
                <rect x="80" y="40" width="5" height="5" fill="black"/>
                <rect x="90" y="40" width="5" height="5" fill="black"/>
                <rect x="70" y="50" width="5" height="5" fill="black"/>
                <rect x="80" y="50" width="5" height="5" fill="black"/>
                <rect x="90" y="50" width="5" height="5" fill="black"/>
                <rect x="40" y="10" width="5" height="5" fill="black"/>
                <rect x="50" y="10" width="5" height="5" fill="black"/>
                <rect x="40" y="20" width="5" height="5" fill="black"/>
                <rect x="50" y="20" width="5" height="5" fill="black"/>
                <rect x="40" y="70" width="5" height="5" fill="black"/>
                <rect x="50" y="70" width="5" height="5" fill="black"/>
                <rect x="40" y="80" width="5" height="5" fill="black"/>
                <rect x="50" y="80" width="5" height="5" fill="black"/>
                <rect x="40" y="90" width="5" height="5" fill="black"/>
                <rect x="50" y="90" width="5" height="5" fill="black"/>
              </svg>
            </div>
            <p className="font-medium mb-1 text-gray-900">Entry QR Code</p>
            <p className="text-sm text-gray-600 mb-2">
              Booking #PK2459
            </p>
            <p className="text-xs text-gray-500">
              Show this at the parking entrance
            </p>
          </div>
        </Card>

        {/* Important Info */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h3 className="font-medium text-blue-900 mb-2">Important Information</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Arrive within 15 minutes of your reserved time</li>
            <li>• Keep your QR code ready for entry</li>
            <li>• Contact support if you need assistance</li>
          </ul>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pb-20">
          <Button 
            onClick={() => onNavigate('reservation')}
            variant="outline"
            className="w-full h-12 border-[#1B1F73] text-[#1B1F73]"
          >
            View Reservation Details
          </Button>
          
          <Button 
            onClick={() => onNavigate('dashboard')}
            className="w-full bg-[#1B1F73] hover:bg-[#1B1F73]/90 h-12"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}