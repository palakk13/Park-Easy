import { ArrowLeft, Bell, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface NotificationsProps {
  onNavigate: (screen: string) => void;
}

export function Notifications({ onNavigate }: NotificationsProps) {
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Reservation Confirmed",
      message: "Your parking spot at Downtown Plaza has been confirmed. Booking #PK2459",
      time: "2 minutes ago",
      unread: true,
      action: "View Details"
    },
    {
      id: 2,
      type: "warning",
      title: "Parking Expiring Soon",
      message: "Your parking at City Center will expire in 30 minutes. Consider extending?",
      time: "25 minutes ago",
      unread: true,
      action: "Extend Booking"
    },
    {
      id: 3,
      type: "success",
      title: "Payment Successful",
      message: "Payment of $34.00 processed successfully via Visa ••••4242",
      time: "1 hour ago",
      unread: true,
      action: "View Receipt"
    },
    {
      id: 4,
      type: "info",
      title: "Booking Reminder",
      message: "Don't forget: Your parking starts at 2:00 PM today at Downtown Plaza",
      time: "2 hours ago",
      unread: false,
      action: "Get Directions"
    },
    {
      id: 5,
      type: "info",
      title: "New Parking Available",
      message: "5 new spots available at Main Street Lot with 20% discount",
      time: "3 hours ago",
      unread: false,
      action: "Book Now"
    },
    {
      id: 6,
      type: "info",
      title: "Reservation Modified",
      message: "Your Downtown Plaza booking has been updated. New time: 3:00 PM - 7:00 PM",
      time: "Yesterday",
      unread: false,
      action: "View Changes"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "info":
        return <Bell className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1B1F73] text-white p-4 pt-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="mr-4"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl">Notifications</h1>
          </div>
          <Badge className="bg-red-500 text-white">3</Badge>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Mark all as read option */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Recent Updates</h2>
          <button className="text-[#1B1F73] text-sm">
            Mark all as read
          </button>
        </div>

        {/* Notifications List */}
        {notifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${
              notification.unread ? 'border-l-4 border-l-[#1B1F73] bg-blue-50/50' : ''
            }`}
          >
            <div className="flex space-x-3">
              <div className="mt-1">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <p className={`font-medium ${notification.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                    {notification.title}
                  </p>
                  {notification.unread && (
                    <div className="w-2 h-2 bg-[#1B1F73] rounded-full ml-2 mt-2"></div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">
                      {notification.time}
                    </span>
                  </div>
                  {notification.action && (
                    <button className="text-xs text-[#1B1F73] hover:underline">
                      {notification.action}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}

        {/* Empty state if no notifications */}
        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">No notifications</p>
            <p className="text-gray-400 text-sm">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
}