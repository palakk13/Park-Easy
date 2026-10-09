import { ArrowLeft, MapPin, Calendar, Clock, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";

interface ReserveSpotProps {
  onNavigate: (screen: string) => void;
}

export function ReserveSpot({ onNavigate }: ReserveSpotProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1B1F73] text-white p-4 pt-12">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => onNavigate('real-time-updates')}
            className="mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl">Reserve a Spot</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Search Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input 
              placeholder="Search for parking location..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Map Placeholder */}
        <Card className="h-48 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Interactive map will appear here</p>
          </div>
        </Card>

        {/* Date & Time Selection */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input 
                type="date"
                defaultValue="2025-09-09"
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input 
                type="time"
                defaultValue="14:00"
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration
          </label>
          <div className="grid grid-cols-4 gap-2">
            {['1h', '2h', '4h', '8h'].map((duration) => (
              <Button 
                key={duration}
                variant="outline" 
                className="h-10"
              >
                {duration}
              </Button>
            ))}
          </div>
        </div>

        {/* Available Spots */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Available Spots</h3>
          <div className="space-y-3">
            {[
              { 
                id: "DTP-A23",
                name: "Downtown Plaza", 
                price: "$8.00", 
                distance: "0.2 mi", 
                spots: 3,
                rating: 4.6,
                features: ["Security Camera", "Covered", "EV Charging"]
              },
              { 
                id: "CCG-B15",
                name: "City Center Garage", 
                price: "$6.50", 
                distance: "0.4 mi", 
                spots: 7,
                rating: 4.3,
                features: ["24/7 Access", "Security Camera"]
              },
              { 
                id: "MSL-C08",
                name: "Main Street Lot", 
                price: "$5.00", 
                distance: "0.6 mi", 
                spots: 12,
                rating: 4.1,
                features: ["Open Air", "Budget Friendly"]
              }
            ].map((spot, index) => (
              <Card 
                key={index} 
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onNavigate('spot-details')}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <p className="font-medium">{spot.name}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="flex text-yellow-400">
                        {"★".repeat(Math.floor(spot.rating))}
                        {"☆".repeat(5 - Math.floor(spot.rating))}
                      </div>
                      <span className="text-xs text-gray-500">({spot.rating})</span>
                    </div>
                    <p className="text-sm text-gray-500">{spot.distance} • {spot.spots} spots available</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-[#1B1F73]">{spot.price}</p>
                    <p className="text-sm text-gray-500">per hour</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {spot.features.slice(0, 2).map((feature, featureIndex) => (
                    <span 
                      key={featureIndex}
                      className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                  {spot.features.length > 2 && (
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                      +{spot.features.length - 2} more
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Confirm Button */}
        <div className="pb-20">
          <Button 
            onClick={() => onNavigate('payment')}
            className="w-full bg-[#1B1F73] hover:bg-[#1B1F73]/90 h-12"
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    </div>
  );
}