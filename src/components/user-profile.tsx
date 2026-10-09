import { ArrowLeft, Edit, LogOut, Bell, Shield, CreditCard, Car, MapPin, Star, Calendar, User, Home, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface UserProfileProps {
  onNavigate: (screen: string) => void;
  onLogout?: () => void;
  user?: {
    name: string;
    email: string;
    avatar: string;
    avatarColor: string;
    vehicleType?: string;
    vehicleMake?: string;
    vehicleModel?: string;
    vehicleColor?: string;
    licensePlate?: string;
  };
}

export function UserProfile({ onNavigate, onLogout, user }: UserProfileProps) {
  const currentUser = user || {
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    avatar: 'JD',
    avatarColor: 'bg-[#1B1F73]',
    vehicleType: 'Electric Vehicle (EV)',
    vehicleMake: 'Tesla',
    vehicleModel: 'Model 3',
    vehicleColor: 'White',
    licensePlate: 'ABC-1234'
  };

  const handleLogout = () => {
    if (onLogout) {
      const confirmLogout = window.confirm('Are you sure you want to logout?');
      if (confirmLogout) {
        onLogout();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Status Bar */}
      <div className="bg-primary px-4 py-2 flex justify-between items-center text-white">
        <span>20:34</span>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white/50 rounded-full"></div>
            </div>
            B.
          </span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2 border border-white rounded-sm">
              <div className="w-3 h-1 bg-white rounded-sm"></div>
            </div>
            <span>43</span>
          </div>
        </div>
      </div>

      {/* Header with Profile Info */}
      <div className="bg-primary text-white px-6 py-6 rounded-b-3xl relative">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-medium">Profile</h1>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Edit size={20} className="text-white" />
          </button>
        </div>
        
        {/* Profile Info Card */}
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 ${currentUser.avatarColor} rounded-full flex items-center justify-center text-white font-medium`}>
            {currentUser.avatar}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-medium text-white">{currentUser.name}</h2>
            <p className="text-blue-100">ParkEasy Member</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Ready to Park Card */}
        <Card className="p-4 bg-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Ready to park?</h3>
              <p className="text-sm text-gray-600">Find and book parking spots near you</p>
            </div>
            <Button 
              onClick={() => onNavigate('dashboard')}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Home size={16} />
              Go to Home
            </Button>
          </div>
        </Card>

        {/* Personal Information Section */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-gray-600" />
            <h3 className="font-medium text-gray-900">Personal Information</h3>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">First Name</label>
                <p className="text-gray-900">{currentUser.name.split(' ')[0]}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Last Name</label>
                <p className="text-gray-900">{currentUser.name.split(' ')[1] || ''}</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Email Address</label>
              <p className="text-gray-900">{currentUser.email}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Phone Number</label>
              <p className="text-gray-900">+1 (555) 123-4567</p>
            </div>
          </div>
        </Card>

        {/* Vehicle Information Section */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Car className="w-5 h-5 text-gray-600" />
            <h3 className="font-medium text-gray-900">Vehicle Information</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Vehicle Type</label>
              <p className="text-gray-900">{currentUser.vehicleType}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Make</label>
                <p className="text-gray-900">{currentUser.vehicleMake}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Model</label>
                <p className="text-gray-900">{currentUser.vehicleModel}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Color</label>
                <p className="text-gray-900">{currentUser.vehicleColor}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">License Plate</label>
                <p className="text-gray-900">{currentUser.licensePlate}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Menu Items */}
        <Card className="p-2">
          <div className="space-y-1">
            <button
              onClick={() => onNavigate('parking-history')}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-gray-600" />
              </div>
              <span className="flex-1 text-left font-medium text-gray-900">Parking History</span>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </button>
            
            <button
              onClick={() => onNavigate('notifications')}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-gray-600" />
              </div>
              <span className="flex-1 text-left font-medium text-gray-900">Notifications</span>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </button>
            
            <button
              onClick={() => onNavigate('payment-methods')}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-gray-600" />
              </div>
              <span className="flex-1 text-left font-medium text-gray-900">Payment Methods</span>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </button>
            
            <button
              onClick={() => onNavigate('user-preferences')}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-gray-600" />
              </div>
              <span className="flex-1 text-left font-medium text-gray-900">User Preferences</span>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </button>
            
            <button
              onClick={() => alert('Privacy settings coming soon')}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-gray-600" />
              </div>
              <span className="flex-1 text-left font-medium text-gray-900">Privacy & Security</span>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </button>
            
            <button
              onClick={() => alert('Help & Support coming soon')}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-gray-600" />
              </div>
              <span className="flex-1 text-left font-medium text-gray-900">Help & Support</span>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </button>
          </div>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full h-12 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </Button>

        {/* App Version */}
        <div className="text-center text-sm text-gray-500">
          ParkEasy v2.1.0
        </div>
      </div>
    </div>
  );
}