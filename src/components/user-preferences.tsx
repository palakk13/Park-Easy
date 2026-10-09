import { ArrowLeft, Bell, Shield, MapPin, Clock, Car, Zap, Moon, Sun, Globe, Volume2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Separator } from "./ui/separator";
import { useState } from "react";

interface UserPreferencesProps {
  onNavigate: (screen: string) => void;
}

export function UserPreferences({ onNavigate }: UserPreferencesProps) {
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    sms: true,
    booking: true,
    reminders: true,
    promotions: false
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: 'english',
    currency: 'inr',
    autoBook: false,
    saveLocation: true,
    shareData: false,
    biometric: true
  });

  const [searchRadius, setSearchRadius] = useState([5]);
  const [reminderTime, setReminderTime] = useState([15]);

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
              <h1 className="text-xl">User Preferences</h1>
              <p className="text-blue-200 text-sm">Customize your app experience</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Notification Preferences */}
        <Card className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="w-5 h-5 text-[#1B1F73]" />
            <h3 className="font-medium">Notification Preferences</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-gray-500">Receive notifications on your device</p>
              </div>
              <Switch 
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">Get updates via email</p>
              </div>
              <Switch 
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Alerts</p>
                <p className="text-sm text-gray-500">Important updates via SMS</p>
              </div>
              <Switch 
                checked={notifications.sms}
                onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Booking Confirmations</p>
                <p className="text-sm text-gray-500">Receive booking status updates</p>
              </div>
              <Switch 
                checked={notifications.booking}
                onCheckedChange={(checked) => setNotifications({...notifications, booking: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Parking Reminders</p>
                <p className="text-sm text-gray-500">Get reminded about your bookings</p>
              </div>
              <Switch 
                checked={notifications.reminders}
                onCheckedChange={(checked) => setNotifications({...notifications, reminders: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Promotional Offers</p>
                <p className="text-sm text-gray-500">Receive deals and discounts</p>
              </div>
              <Switch 
                checked={notifications.promotions}
                onCheckedChange={(checked) => setNotifications({...notifications, promotions: checked})}
              />
            </div>
          </div>
        </Card>

        {/* App Preferences */}
        <Card className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-5 h-5 text-[#1B1F73]" />
            <h3 className="font-medium">App Preferences</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {preferences.darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-gray-500">Use dark theme</p>
                  </div>
                </div>
              </div>
              <Switch 
                checked={preferences.darkMode}
                onCheckedChange={(checked) => setPreferences({...preferences, darkMode: checked})}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <p className="font-medium">Language</p>
              </div>
              <Select value={preferences.language} onValueChange={(value) => setPreferences({...preferences, language: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">हिन्दी (Hindi)</SelectItem>
                  <SelectItem value="spanish">Español</SelectItem>
                  <SelectItem value="french">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg">₹</span>
                <p className="font-medium">Currency</p>
              </div>
              <Select value={preferences.currency} onValueChange={(value) => setPreferences({...preferences, currency: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inr">₹ Indian Rupee (INR)</SelectItem>
                  <SelectItem value="usd">$ US Dollar (USD)</SelectItem>
                  <SelectItem value="eur">€ Euro (EUR)</SelectItem>
                  <SelectItem value="gbp">£ British Pound (GBP)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Parking Preferences */}
        <Card className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <Car className="w-5 h-5 text-[#1B1F73]" />
            <h3 className="font-medium">Parking Preferences</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto-book Preferred Spots</p>
                <p className="text-sm text-gray-500">Automatically book your favorite locations</p>
              </div>
              <Switch 
                checked={preferences.autoBook}
                onCheckedChange={(checked) => setPreferences({...preferences, autoBook: checked})}
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <p className="font-medium">Search Radius</p>
              </div>
              <div className="space-y-2">
                <Slider
                  value={searchRadius}
                  onValueChange={setSearchRadius}
                  max={20}
                  min={1}
                  step={1}
                  className="[&_[role=slider]]:bg-[#1B1F73] [&_[role=slider]]:border-[#1B1F73]"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>1 km</span>
                  <span className="font-medium text-[#1B1F73]">{searchRadius[0]} km</span>
                  <span>20 km</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <p className="font-medium">Reminder Time</p>
              </div>
              <div className="space-y-2">
                <Slider
                  value={reminderTime}
                  onValueChange={setReminderTime}
                  max={60}
                  min={5}
                  step={5}
                  className="[&_[role=slider]]:bg-[#1B1F73] [&_[role=slider]]:border-[#1B1F73]"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>5 min</span>
                  <span className="font-medium text-[#1B1F73]">{reminderTime[0]} min before</span>
                  <span>60 min</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Privacy & Security */}
        <Card className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-5 h-5 text-[#1B1F73]" />
            <h3 className="font-medium">Privacy & Security</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Save Location History</p>
                <p className="text-sm text-gray-500">Remember your frequently visited places</p>
              </div>
              <Switch 
                checked={preferences.saveLocation}
                onCheckedChange={(checked) => setPreferences({...preferences, saveLocation: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Share Usage Data</p>
                <p className="text-sm text-gray-500">Help improve the app experience</p>
              </div>
              <Switch 
                checked={preferences.shareData}
                onCheckedChange={(checked) => setPreferences({...preferences, shareData: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Biometric Authentication</p>
                <p className="text-sm text-gray-500">Use fingerprint or face unlock</p>
              </div>
              <Switch 
                checked={preferences.biometric}
                onCheckedChange={(checked) => setPreferences({...preferences, biometric: checked})}
              />
            </div>
          </div>
        </Card>

        {/* EV Settings */}
        <Card className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="w-5 h-5 text-green-600" />
            <h3 className="font-medium">EV Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="font-medium">Preferred Charging Speed</p>
              <Select defaultValue="fast">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slow">Slow Charging (3-7 kW)</SelectItem>
                  <SelectItem value="fast">Fast Charging (22-50 kW)</SelectItem>
                  <SelectItem value="rapid">Rapid Charging (50+ kW)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <p className="font-medium">Charging Connector Type</p>
              <Select defaultValue="type2">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="type2">Type 2 (Mennekes)</SelectItem>
                  <SelectItem value="ccs">CCS (Combined Charging System)</SelectItem>
                  <SelectItem value="chademo">CHAdeMO</SelectItem>
                  <SelectItem value="tesla">Tesla Supercharger</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full bg-[#1B1F73] hover:bg-[#1B1F73]/90 h-12"
            onClick={() => {
              // Save preferences logic here
              alert('Preferences saved successfully!');
            }}
          >
            Save Preferences
          </Button>
          
          <Button 
            variant="outline"
            className="w-full h-12"
            onClick={() => {
              // Reset preferences logic here
              if (confirm('Reset all preferences to default values?')) {
                // Reset logic here
                alert('Preferences reset to default');
              }
            }}
          >
            Reset to Default
          </Button>
        </div>

        <div className="pb-20"></div>
      </div>
    </div>
  );
}