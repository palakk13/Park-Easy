import { ArrowLeft, AlertTriangle, DollarSign, Clock, CheckCircle, XCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";

interface CancelReservationProps {
  onNavigate: (screen: string) => void;
}

export function CancelReservation({ onNavigate }: CancelReservationProps) {
  const currentTime = new Date();
  const reservationStart = new Date(currentTime.getTime() + 6 * 60 * 60 * 1000); // 6 hours from now
  const hoursUntilStart = Math.floor((reservationStart.getTime() - currentTime.getTime()) / (1000 * 60 * 60));
  
  // Calculate refund based on cancellation policy
  const originalAmount = 34.00;
  const refundPercentage = hoursUntilStart >= 24 ? 100 : hoursUntilStart >= 2 ? 75 : 0;
  const refundAmount = (originalAmount * refundPercentage) / 100;
  const cancellationFee = originalAmount - refundAmount;

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
          <h1 className="text-xl">Cancel Reservation</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Booking Summary */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Reservation Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Booking ID</span>
              <span className="font-medium">#PK2459</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location</span>
              <span className="font-medium">Downtown Plaza - A-23</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time</span>
              <span className="font-medium">Sep 9, 2:00 PM - 6:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Original Amount</span>
              <span className="font-medium">${originalAmount.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Cancellation Policy */}
        <Alert className={refundPercentage > 0 ? "border-yellow-200 bg-yellow-50" : "border-red-200 bg-red-50"}>
          <AlertTriangle className={`h-4 w-4 ${refundPercentage > 0 ? "text-yellow-600" : "text-red-600"}`} />
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-medium">Cancellation Policy</p>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>24+ hours: 100% refund</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <span>2-24 hours: 75% refund</span>
                </div>
                <div className="flex items-center space-x-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span>Less than 2 hours: No refund</span>
                </div>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        {/* Refund Calculation */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Refund Calculation</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Time until reservation</span>
              </div>
              <span className="font-medium">{hoursUntilStart} hours</span>
            </div>
            
            <Separator className="my-2" />
            
            <div className="flex justify-between">
              <span className="text-gray-600">Original Amount</span>
              <span>${originalAmount.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Refund ({refundPercentage}%)</span>
              <span className={refundAmount > 0 ? "text-green-600" : "text-red-600"}>
                ${refundAmount.toFixed(2)}
              </span>
            </div>
            
            {cancellationFee > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Cancellation Fee</span>
                <span className="text-red-600">-${cancellationFee.toFixed(2)}</span>
              </div>
            )}
            
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between text-lg font-medium">
                <span>Total Refund</span>
                <span className={`flex items-center space-x-1 ${refundAmount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <DollarSign className="w-4 h-4" />
                  <span>{refundAmount.toFixed(2)}</span>
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Refund Timeline */}
        {refundAmount > 0 && (
          <Card className="p-4 bg-blue-50 border-blue-200">
            <h3 className="font-medium text-blue-900 mb-2">Refund Information</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Refund will be processed to your original payment method</li>
              <li>• Processing time: 3-5 business days for cards</li>
              <li>• UPI/Wallet refunds: Instant to 24 hours</li>
            </ul>
          </Card>
        )}

        {/* Cancellation Reason */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Reason for Cancellation (Optional)</h3>
          <Textarea
            placeholder="Help us improve our service by sharing your reason..."
            className="min-h-[80px]"
          />
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pb-20">
          <Button 
            onClick={() => onNavigate('dashboard')}
            variant="destructive"
            className="w-full h-12"
          >
            Confirm Cancellation
          </Button>
          
          <Button 
            onClick={() => onNavigate('reservation')}
            variant="outline" 
            className="w-full h-12"
          >
            Keep Reservation
          </Button>
        </div>
      </div>
    </div>
  );
}