import { ArrowLeft, Navigation, MapPin, Clock, Zap, AlertTriangle, Volume2, VolumeX, RotateCcw, Share2, Phone, Car } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { useState } from "react";

interface NavigationSupportProps {
  onNavigate: (screen: string) => void;
}

export function NavigationSupport({ onNavigate }: NavigationSupportProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [currentInstruction, setCurrentInstruction] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  const routeInfo = {
    destination: "Downtown Plaza - Parking A-23",
    address: "123 Main Street, Downtown",
    distance: "2.4 km",
    estimatedTime: "8 min",
    trafficSaved: "12 min",
    fuelSaved: "₹15"
  };

  const navigationInstructions = [
    { distance: "100m", instruction: "Head southeast on Current Street", type: "straight" },
    { distance: "500m", instruction: "Turn right onto Main Avenue", type: "turn_right" },
    { distance: "800m", instruction: "Continue straight - AI route avoiding traffic", type: "ai_route" },
    { distance: "600m", instruction: "Turn left onto Commerce Street", type: "turn_left" },
    { distance: "400m", instruction: "Turn right onto Downtown Plaza", type: "turn_right" },
    { distance: "100m", instruction: "Destination on your right - Level 2 Parking", type: "destination" }
  ];

  const trafficAlerts = [
    { type: "construction", message: "Construction work ahead - AI route optimized", severity: "medium" },
    { type: "congestion", message: "Heavy traffic on alternate route avoided", severity: "high" },
    { type: "accident", message: "Accident cleared - route updated", severity: "low" }
  ];

  // On invalid input/state, call window.alert(message) and abort the handler
  const checkGPSAvailability = (): boolean => {
    // Simulate GPS check - in a real app, this would check navigator.geolocation
    if (!navigator.geolocation) {
      return false;
    }
    
    // Simulate various GPS scenarios (you can modify this for testing)
    // For demo purposes, we'll randomly simulate GPS issues 20% of the time
    const gpsAvailable = Math.random() > 0.2;
    
    return gpsAvailable;
  };

  const startNavigation = () => {
    // Check GPS availability first
    if (!checkGPSAvailability()) {
      window.alert('Location unavailable. Please enable GPS or check your network connection.');
      return;
    }

    setIsNavigating(true);
    setCurrentInstruction(0);
    // Simulate navigation progress
    const interval = setInterval(() => {
      setCurrentInstruction(prev => {
        if (prev >= navigationInstructions.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 5000);
  };

  const retryGPS = () => {
    if (!checkGPSAvailability()) {
      window.alert('Location unavailable. Please enable GPS or check your network connection.');
    } else {
      // GPS is now available, attempt to start navigation
      startNavigation();
    }
  };

  const getInstructionIcon = (type: string) => {
    switch (type) {
      case "turn_right":
        return "↗️";
      case "turn_left":
        return "↖️";
      case "straight":
        return "⬆️";
      case "ai_route":
        return "🤖";
      case "destination":
        return "🏁";
      default:
        return "➡️";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1B1F73] text-white p-4 pt-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="mr-3"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl">AI Navigation</h1>
              <p className="text-blue-200 text-sm">Smart routing with traffic optimization</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 bg-white/20 rounded-full"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button className="p-2 bg-white/20 rounded-full">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Route Summary */}
        <Card className="bg-white/10 border-white/20 text-white">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Navigation className="w-5 h-5" />
                <span className="font-medium">Optimal Route</span>
                <Badge className="bg-green-500 text-white">AI Optimized</Badge>
              </div>
              <div className="text-right">
                <p className="font-medium">{routeInfo.estimatedTime}</p>
                <p className="text-sm text-blue-200">{routeInfo.distance}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-green-400" />
                <span>Saved: {routeInfo.trafficSaved}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Fuel saved: {routeInfo.fuelSaved}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Interactive Map */}
      <div className="relative">
        <div className="h-80 bg-gray-200 relative overflow-hidden">
          {/* Map Background with route */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
            {/* Street grid */}
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(90deg, #e5e7eb 1px, transparent 1px),
                              linear-gradient(180deg, #e5e7eb 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}></div>
            
            {/* Optimized route (blue line) */}
            <svg className="absolute inset-0 w-full h-full">
              <path
                d="M 50 320 Q 100 280 150 240 Q 200 200 250 160 Q 300 120 350 80"
                stroke="#1B1F73"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="10,5"
                className="animate-pulse"
              />
              {/* Alternative route (red - avoided) */}
              <path
                d="M 50 320 Q 120 300 200 280 Q 280 260 350 240"
                stroke="#ef4444"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                opacity="0.5"
                strokeDasharray="5,5"
              />
            </svg>

            {/* Current location */}
            <div className="absolute bottom-16 left-12 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-bounce">
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping"></div>
            </div>

            {/* Destination */}
            <div className="absolute top-16 right-12 w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
              <MapPin className="w-3 h-3 text-white" />
            </div>

            {/* Traffic indicators */}
            <div className="absolute top-32 left-32 w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="absolute top-40 left-40 w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="absolute bottom-32 right-32 w-2 h-2 bg-green-500 rounded-full"></div>

            {/* AI Route markers */}
            <div className="absolute top-24 left-24 bg-[#1B1F73] text-white text-xs px-2 py-1 rounded-full">
              AI Route
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 space-y-2">
            <Button size="sm" variant="outline" className="bg-white/90">
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" className="bg-white/90">
              +
            </Button>
            <Button size="sm" variant="outline" className="bg-white/90">
              -
            </Button>
          </div>

          {/* Current instruction overlay */}
          {isNavigating && (
            <div className="absolute bottom-4 left-4 right-4">
              <Card className="bg-white/95 border-[#1B1F73]/20">
                <div className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">
                      {getInstructionIcon(navigationInstructions[currentInstruction]?.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        In {navigationInstructions[currentInstruction]?.distance}
                      </p>
                      <p className="text-sm text-gray-600">
                        {navigationInstructions[currentInstruction]?.instruction}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Start Navigation Button */}
        {!isNavigating && (
          <div className="space-y-2">
            <Button 
              onClick={startNavigation}
              className="w-full bg-[#1B1F73] hover:bg-[#1B1F73]/90 h-12"
            >
              <Navigation className="w-5 h-5 mr-2" />
              Start AI Navigation
            </Button>
            <Button 
              onClick={retryGPS}
              variant="outline"
              className="w-full h-10"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retry GPS
            </Button>
          </div>
        )}

        {/* Navigation Controls */}
        {isNavigating && (
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={() => setIsNavigating(false)}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-50"
            >
              Stop Navigation
            </Button>
            <Button className="bg-[#1B1F73] hover:bg-[#1B1F73]/90">
              <Phone className="w-4 h-4 mr-2" />
              Call Support
            </Button>
          </div>
        )}

        {/* AI Features */}
        <Card className="p-4">
          <h3 className="font-medium mb-3 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-[#1B1F73]" />
            AI Route Optimization
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Traffic Analysis</span>
              <Badge className="bg-green-100 text-green-800">Real-time</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Road Conditions</span>
              <Badge className="bg-blue-100 text-blue-800">Optimized</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Fuel Efficiency</span>
              <Badge className="bg-purple-100 text-purple-800">Enhanced</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Parking Availability</span>
              <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
            </div>
          </div>
        </Card>

        {/* Traffic Alerts */}
        <Card className="p-4">
          <h3 className="font-medium mb-3 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
            Traffic Intelligence
          </h3>
          <div className="space-y-3">
            {trafficAlerts.map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                <p className="text-sm font-medium">{alert.message}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Turn-by-turn Instructions */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Turn-by-turn Directions</h3>
          <div className="space-y-3">
            {navigationInstructions.map((step, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                  isNavigating && index === currentInstruction 
                    ? 'bg-[#1B1F73]/10 border border-[#1B1F73]/20' 
                    : index < currentInstruction && isNavigating
                    ? 'opacity-50'
                    : ''
                }`}
              >
                <div className="text-lg">{getInstructionIcon(step.type)}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{step.instruction}</p>
                  <p className="text-xs text-gray-500">{step.distance}</p>
                </div>
                {isNavigating && index === currentInstruction && (
                  <div className="w-2 h-2 bg-[#1B1F73] rounded-full animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Destination Info */}
        <Card className="p-4">
          <h3 className="font-medium mb-3 flex items-center">
            <Car className="w-5 h-5 mr-2 text-[#1B1F73]" />
            Destination Details
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Parking Location</span>
              <span className="font-medium">{routeInfo.destination}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Address</span>
              <span className="font-medium text-right">{routeInfo.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Parking Level</span>
              <span className="font-medium">Level 2 - Spot A-23</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Arrival</span>
              <span className="font-medium text-green-600">2:08 PM</span>
            </div>
          </div>
        </Card>

        <div className="pb-20"></div>
      </div>
    </div>
  );
}