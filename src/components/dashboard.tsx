import { Bell, CreditCard, MapPin, User, Car, BarChart3, Wifi, History, Settings, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface DashboardProps {
  onNavigate: (screen: string) => void;
  onLogout?: () => void;
  currentUser?: {
    name: string;
    email: string;
    avatar: string;
    avatarColor: string;
  };
}

export function Dashboard({ onNavigate, onLogout, currentUser }: DashboardProps) {
  const user = currentUser || {
    name: 'John',
    email: 'john.doe@gmail.com',
    avatar: 'JD',
    avatarColor: 'bg-[#1B1F73]'
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1B1F73] text-white p-4 pt-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl">Hello, {user.name.split(' ')[0]}</h1>
            <p className="text-blue-200 text-sm">Find your perfect parking spot</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => onNavigate('notifications')}
              className="relative w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
            >
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">3</span>
              </div>
            </button>
            <button 
              onClick={() => onNavigate('user-profile')}
              className={`w-10 h-10 ${user.avatarColor} rounded-full flex items-center justify-center text-white font-medium hover:opacity-80 transition-opacity`}
            >
              {user.avatar}
            </button>
          </div>
        </div>
        
        {/* Reserve CTA */}
        <Button 
          onClick={() => onNavigate('spot-details')}
          className="w-full bg-white text-[#1B1F73] hover:bg-gray-100 h-12 mb-4"
        >
          <MapPin className="w-5 h-5 mr-2" />
          Quick Reserve (Downtown Plaza)
        </Button>
      </div>

      <div className="p-4 space-y-4">
        {/* Live Availability Button */}
        <Card 
          className="p-4 cursor-pointer hover:shadow-md transition-shadow border-[#1B1F73]/20"
          onClick={() => onNavigate('live-availability')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#1B1F73]/10 rounded-lg flex items-center justify-center">
                <Wifi className="w-6 h-6 text-[#1B1F73]" />
              </div>
              <div>
                <h3 className="font-medium">Live Availability</h3>
                <p className="text-sm text-gray-500">Real-time parking spots</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600">Live</span>
            </div>
          </div>
        </Card>

        {/* EV Charging Stations Button */}
        <Card 
          className="p-4 cursor-pointer hover:shadow-md transition-shadow border-green-500/20"
          onClick={() => onNavigate('ev-charging-stations')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">EV Charging Stations</h3>
                <p className="text-sm text-gray-500">Find nearby charging points</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-yellow-600">⚡ Fast</span>
            </div>
          </div>
        </Card>

        {/* Current Reservation */}
        <div>
          <h3 className="text-lg text-gray-900 mb-3">Current Reservation</h3>
          <Card 
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onNavigate('reservation')}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Downtown Plaza</p>
                <p className="text-sm text-gray-500">Spot A-23 • Until 6:00 PM</p>
                <p className="text-sm text-green-600">Active</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-[390px] mx-auto">
        <div className="flex justify-around py-2">
          <div className="flex flex-col items-center py-2 px-3">
            <div className="w-6 h-6 bg-[#1B1F73] rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="text-xs text-[#1B1F73] mt-1">Home</span>
          </div>
          <button 
            onClick={() => onNavigate('parking-history')}
            className="flex flex-col items-center py-2 px-3"
          >
            <History className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">History</span>
          </button>
          <button 
            onClick={() => onNavigate('parking-history')}
            className="flex flex-col items-center py-2 px-3"
          >
            <BarChart3 className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">Analytics</span>
          </button>
          <button 
            onClick={() => onNavigate('push-notifications')}
            className="flex flex-col items-center py-2 px-3"
          >
            <Settings className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}