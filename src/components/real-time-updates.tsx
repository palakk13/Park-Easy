import { ArrowLeft, MapPin, Clock, RefreshCw, AlertCircle, CheckCircle, TrendingUp, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { useState, useEffect } from "react";

interface RealTimeUpdatesProps {
  onNavigate: (screen: string) => void;
}

export function RealTimeUpdates({ onNavigate }: RealTimeUpdatesProps) {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const parkingLots = [
    {
      id: "DTP",
      name: "Downtown Plaza",
      total: 120,
      available: 35,
      distance: "0.2 km",
      trend: "increasing",
      lastUpdate: "30 sec ago",
      priceRange: " ₹6-8/hr",
      peakHours: "2:00 PM - 6:00 PM",
      currentWaitTime: "0 min"
    },
    {
      id: "CCG", 
      name: "City Center Garage",
      total: 200,
      available: 50,
      distance: "0.5 km",
      trend: "stable",
      lastUpdate: "45 sec ago", 
      priceRange: "₹5-7/hr",
      peakHours: "12:00 PM - 4:00 PM",
      currentWaitTime: "2 min"
    },
    {
      id: "MSL",
      name: "Main Street Lot", 
      total: 80,
      available: 15,
      distance: "0.8 km",
      trend: "decreasing",
      lastUpdate: "1 min ago",
      priceRange: "₹4-6/hr", 
      peakHours: "9:00 AM - 11:00 AM",
      currentWaitTime: "5 min"
    },
    {
      id: "APT",
      name: "Airport Terminal",
      total: 500,
      available: 80,
      distance: "3.2 km",
      trend: "increasing",
      lastUpdate: "2 min ago",
      priceRange: "₹15-25/day",
      peakHours: "6:00 AM - 10:00 AM", 
      currentWaitTime: "0 min"
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case "decreasing":
        return <TrendingUp className="w-4 h-4 text-green-500 rotate-180" />;
      default:
        return <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>;
    }
  };

  const getAvailabilityStatus = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 30) return { color: "green", status: "Good" };
    if (percentage > 10) return { color: "yellow", status: "Limited" };
    return { color: "red", status: "Critical" };
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date());
    }, 1500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

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
            <h1 className="text-xl">Live Availability</h1>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        
        <Card className="bg-white/10 border-white/20 text-white">
          <div className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Live Updates</span>
              </div>
              <span className="text-sm opacity-80">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </Card>
      </div>

      <div className="p-4 space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-3 text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-lg font-medium">4</span>
            </div>
            <p className="text-xs text-gray-600">Active Lots</p>
          </Card>
          
          <Card className="p-3 text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-lg font-medium">180</span>
            </div>
            <p className="text-xs text-gray-600">Available</p>
          </Card>
          
          <Card className="p-3 text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <MapPin className="w-4 h-4 text-purple-600" />
              <span className="text-lg font-medium">1.4</span>
            </div>
            <p className="text-xs text-gray-600">Avg Distance</p>
          </Card>
        </div>

        {/* Parking Lots */}
        <div className="space-y-4">
          {parkingLots.map((lot) => {
            const availabilityStatus = getAvailabilityStatus(lot.available, lot.total);
            
            return (
              <Card key={lot.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium">{lot.name}</h3>
                      <Badge 
                        className={`${
                          availabilityStatus.color === 'green' ? 'bg-green-100 text-green-800' :
                          availabilityStatus.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {availabilityStatus.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{lot.available} spots available</span>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{lot.distance}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(lot.trend)}
                    <span className="text-sm text-gray-500">{lot.lastUpdate}</span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-3 gap-3 text-sm mb-3">
                  <div>
                    <p className="text-gray-600">Price</p>
                    <p className="font-medium">{lot.priceRange}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Wait Time</p>
                    <p className="font-medium">{lot.currentWaitTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Distance</p>
                    <p className="font-medium">{lot.distance}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-gray-600 text-sm">Peak Hours</p>
                  <p className="font-medium text-sm">{lot.peakHours}</p>
                </div>

                {/* Action Button */}
                <Button 
                  onClick={() => onNavigate('reserve-spot')}
                  className="w-full bg-[#1B1F73] hover:bg-[#1B1F73]/90"
                  disabled={lot.available === 0}
                >
                  {lot.available === 0 ? 'No Spots Available' : 'Reserve Spot'}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Alert Notice */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900 mb-1">Real-Time Updates</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Availability updates every 30 seconds</li>
                <li>• Prices may vary during peak hours</li>
                <li>• Reserve quickly as spots fill up fast</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}