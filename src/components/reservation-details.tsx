import { ArrowLeft, MapPin, Calendar, Clock, Edit, Trash2, QrCode, Navigation } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface ReservationDetailsProps {
  onNavigate: (screen: string) => void;
}

export function ReservationDetails({ onNavigate }: ReservationDetailsProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1B1F73] text-white p-4 pt-12">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl">Reservation Details</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Status Card */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Active
            </Badge>
            <p className="text-sm text-gray-500">Booking #PK2459</p>
          </div>
          
          <div className="text-center py-6">
            <div className="w-24 h-24 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4 p-2">
              {/* Sample QR Code SVG */}
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="80" height="80" fill="white"/>
                <rect x="8" y="8" width="16" height="16" fill="black"/>
                <rect x="12" y="12" width="8" height="8" fill="white"/>
                <rect x="56" y="8" width="16" height="16" fill="black"/>
                <rect x="60" y="60" width="8" height="8" fill="white"/>
                <rect x="8" y="56" width="16" height="16" fill="black"/>
                <rect x="12" y="60" width="8" height="8" fill="white"/>
                <rect x="32" y="32" width="16" height="16" fill="black"/>
                <rect x="36" y="36" width="8" height="8" fill="white"/>
                <rect x="8" y="32" width="4" height="4" fill="black"/>
                <rect x="16" y="32" width="4" height="4" fill="black"/>
                <rect x="24" y="32" width="4" height="4" fill="black"/>
                <rect x="8" y="40" width="4" height="4" fill="black"/>
                <rect x="16" y="40" width="4" height="4" fill="black"/>
                <rect x="24" y="40" width="4" height="4" fill="black"/>
                <rect x="56" y="32" width="4" height="4" fill="black"/>
                <rect x="64" y="32" width="4" height="4" fill="black"/>
                <rect x="72" y="32" width="4" height="4" fill="black"/>
                <rect x="56" y="40" width="4" height="4" fill="black"/>
                <rect x="64" y="40" width="4" height="4" fill="black"/>
                <rect x="72" y="40" width="4" height="4" fill="black"/>
                <rect x="32" y="8" width="4" height="4" fill="black"/>
                <rect x="40" y="8" width="4" height="4" fill="black"/>
                <rect x="32" y="16" width="4" height="4" fill="black"/>
                <rect x="40" y="16" width="4" height="4" fill="black"/>
                <rect x="32" y="56" width="4" height="4" fill="black"/>
                <rect x="40" y="56" width="4" height="4" fill="black"/>
                <rect x="32" y="64" width="4" height="4" fill="black"/>
                <rect x="40" y="64" width="4" height="4" fill="black"/>
                <rect x="32" y="72" width="4" height="4" fill="black"/>
                <rect x="40" y="72" width="4" height="4" fill="black"/>
              </svg>
            </div>
            <p className="text-sm text-gray-600 mb-2">Booking #PK2459</p>
            <p className="text-xs text-gray-500">Show this QR code at the parking entrance</p>
          </div>
        </Card>

        {/* Location Details */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Location Details</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">Downtown Plaza</p>
                <p className="text-sm text-gray-500">123 Main Street, Downtown</p>
                <p className="text-sm text-gray-500">Spot: A-23 (Level 2)</p>
              </div>
            </div>
            
            {/* Navigation Support Button */}
            <Button 
              onClick={() => onNavigate('navigation-support')}
              className="w-full bg-[#1B1F73] hover:bg-[#1B1F73]/90 h-11 mt-3"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Get AI Navigation Support
            </Button>
          </div>
        </Card>

        {/* Time Details */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Parking Time</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium">Tuesday, September 9, 2025</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium">2:00 PM - 6:00 PM</p>
                <p className="text-sm text-gray-500">4 hours duration</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Summary */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Payment Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Base Rate (4 hours)</span>
              <span>$32.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Service Fee</span>
              <span>$2.00</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-medium">
                <span>Total Paid</span>
                <span className="text-[#1B1F73]">$34.00</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pb-20">
          <Button 
            onClick={() => onNavigate('modify-reservation')}
            variant="outline" 
            className="w-full h-12 border-[#1B1F73] text-[#1B1F73] hover:bg-[#1B1F73]/5"
          >
            <Edit className="w-5 h-5 mr-2" />
            Modify Reservation
          </Button>
          
          <Button 
            onClick={() => onNavigate('cancel-reservation')}
            variant="outline" 
            className="w-full h-12 border-red-500 text-red-500 hover:bg-red-50"
          >
            <Trash2 className="w-5 h-5 mr-2" />
            Cancel Reservation
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