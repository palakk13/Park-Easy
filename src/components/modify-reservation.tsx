import { ArrowLeft, Calendar, Clock, MapPin, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";

interface ModifyReservationProps {
  onNavigate: (screen: string) => void;
}

export function ModifyReservation({ onNavigate }: ModifyReservationProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1B1F73] text-white p-4 pt-12">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => onNavigate('reservation')}
            className="mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl">Modify Reservation</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Current Reservation Info */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center space-x-2 mb-3">
            <Badge className="bg-blue-600 text-white">Current Booking</Badge>
            <span className="text-sm text-blue-700">#PK2459</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-blue-800">Downtown Plaza - Spot A-23</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-blue-800">Sep 9, 2025</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-blue-800">2:00 PM - 6:00 PM (4 hours)</span>
            </div>
          </div>
        </Card>

        {/* Modification Notice */}
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You can modify your reservation up to 2 hours before the start time. Additional charges may apply for extensions.
          </AlertDescription>
        </Alert>

        {/* New Date Selection */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">New Date</h3>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input 
              type="date"
              defaultValue="2025-09-09"
              min="2025-09-09"
              className="pl-10"
            />
          </div>
        </Card>

        {/* New Time Selection */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">New Time</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Start Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input 
                  type="time"
                  defaultValue="14:00"
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">End Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input 
                  type="time"
                  defaultValue="18:00"
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Duration Quick Select */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Duration</h3>
          <div className="grid grid-cols-4 gap-2">
            {['2h', '4h', '6h', '8h'].map((duration, index) => (
              <Button 
                key={duration}
                variant={index === 1 ? "default" : "outline"}
                className={`h-10 ${index === 1 ? 'bg-[#1B1F73]' : ''}`}
              >
                {duration}
              </Button>
            ))}
          </div>
        </Card>

        {/* Price Comparison */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Price Comparison</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Current Total</span>
              <span>$34.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">New Total</span>
              <span className="text-[#1B1F73] font-medium">$34.00</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-medium">Additional Charge</span>
              <span className="text-green-600 font-medium">$0.00</span>
            </div>
          </div>
        </Card>

        {/* Modification Fee Notice */}
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-800 mb-1">Modification Policy</p>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Free modifications up to 2 hours before start time</li>
                <li>• Extensions may incur additional parking fees</li>
                <li>• Shortened duration: refund processed in 3-5 days</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pb-20">
          <Button 
            className="w-full bg-[#1B1F73] hover:bg-[#1B1F73]/90 h-12"
          >
            Confirm Modifications
          </Button>
          
          <Button 
            onClick={() => onNavigate('reservation')}
            variant="outline" 
            className="w-full h-12"
          >
            Cancel Changes
          </Button>
        </div>
      </div>
    </div>
  );
}