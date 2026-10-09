import { ArrowLeft, Bell, Toggle, Clock, MapPin, CreditCard, AlertTriangle, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface PushNotificationsProps {
  onNavigate: (screen: string) => void;
}

export function PushNotifications({ onNavigate }: PushNotificationsProps) {
  const notificationSettings = [
    {
      id: "booking-reminders",
      title: "Booking Reminders",
      description: "Get notified before your parking session starts",
      enabled: true,
      timing: "15 min before",
      category: "bookings"
    },
    {
      id: "expiry-alerts", 
      title: "Expiry Alerts",
      description: "Alerts when your parking time is about to expire",
      enabled: true,
      timing: "30 min before",
      category: "bookings"
    },
    {
      id: "payment-confirmations",
      title: "Payment Confirmations", 
      description: "Instant notifications for successful payments",
      enabled: true,
      timing: "Immediate",
      category: "payments"
    },
    {
      id: "availability-updates",
      title: "Spot Availability",
      description: "Get notified when preferred locations have spots",
      enabled: false,
      timing: "Real-time",
      category: "availability"
    },
    {
      id: "price-drops",
      title: "Price Alerts",
      description: "Notify when parking rates drop at saved locations", 
      enabled: false,
      timing: "Daily",
      category: "promotions"
    },
    {
      id: "booking-modifications",
      title: "Booking Changes",
      description: "Updates when reservations are modified or cancelled",
      enabled: true,
      timing: "Immediate",
      category: "bookings"
    },
    {
      id: "promotional-offers",
      title: "Promotional Offers",
      description: "Special discounts and deals near you",
      enabled: false,
      timing: "Weekly",
      category: "promotions"
    }
  ];

  const recentNotifications = [
    {
      id: 1,
      type: "reminder",
      title: "Parking Session Starting Soon",
      message: "Your Downtown Plaza reservation starts in 15 minutes",
      time: "2 min ago",
      status: "delivered"
    },
    {
      id: 2,
      type: "payment",
      title: "Payment Successful",
      message: "$34.00 charged to Visa ••••4242",
      time: "1 hour ago", 
      status: "delivered"
    },
    {
      id: 3,
      type: "expiry",
      title: "Parking Expiring Soon",
      message: "Your session at City Center ends in 30 minutes",
      time: "3 hours ago",
      status: "delivered"
    },
    {
      id: 4,
      type: "availability",
      title: "Spot Available",
      message: "Downtown Plaza now has 5 spots available",
      time: "Yesterday",
      status: "delivered"
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "payment":
        return <CreditCard className="w-4 h-4 text-green-500" />;
      case "expiry":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "availability":
        return <MapPin className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "bookings":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "payments":
        return <CreditCard className="w-4 h-4 text-green-600" />;
      case "availability":
        return <MapPin className="w-4 h-4 text-purple-600" />;
      case "promotions":
        return <Badge className="w-4 h-4 text-orange-600" />;
      default:
        return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

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
          <h1 className="text-xl">Notification Settings</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Master Toggle */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#1B1F73]/10 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#1B1F73]" />
              </div>
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-gray-500">Enable all mobile notifications</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </Card>

        {/* Notification Categories */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Notification Types</h3>
          
          {/* Group by category */}
          {['bookings', 'payments', 'availability', 'promotions'].map((category) => {
            const categorySettings = notificationSettings.filter(setting => setting.category === category);
            const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
            
            return (
              <Card key={category} className="p-4">
                <div className="flex items-center space-x-2 mb-4">
                  {getCategoryIcon(category)}
                  <h4 className="font-medium">{categoryName}</h4>
                </div>
                
                <div className="space-y-4">
                  {categorySettings.map((setting) => (
                    <div key={setting.id}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{setting.title}</p>
                          <p className="text-sm text-gray-500">{setting.description}</p>
                          <p className="text-xs text-gray-400 mt-1">Timing: {setting.timing}</p>
                        </div>
                        <Switch defaultChecked={setting.enabled} />
                      </div>
                      {setting !== categorySettings[categorySettings.length - 1] && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quiet Hours */}
        <Card className="p-4">
          <h4 className="font-medium mb-4">Quiet Hours</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Do Not Disturb</p>
                <p className="text-sm text-gray-500">Silence notifications during set hours</p>
              </div>
              <Switch />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                <Select defaultValue="22:00">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20:00">8:00 PM</SelectItem>
                    <SelectItem value="21:00">9:00 PM</SelectItem>
                    <SelectItem value="22:00">10:00 PM</SelectItem>
                    <SelectItem value="23:00">11:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <Select defaultValue="07:00">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="06:00">6:00 AM</SelectItem>
                    <SelectItem value="07:00">7:00 AM</SelectItem>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Notifications */}
        <Card className="p-4">
          <h4 className="font-medium mb-4">Recent Notifications</h4>
          <div className="space-y-3">
            {recentNotifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3">
                <div className="mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{notification.title}</p>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{notification.time}</span>
                    <Badge variant="outline" className="text-xs">
                      {notification.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Test Notification */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-blue-900">Test Notifications</p>
              <p className="text-sm text-blue-700">Send a test notification to verify settings</p>
            </div>
            <Button variant="outline" size="sm" className="border-blue-300 text-blue-700">
              Send Test
            </Button>
          </div>
        </Card>

        {/* Device Settings Link */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium">Device Settings</p>
                <p className="text-sm text-gray-500">Manage notifications in device settings</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Open
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}