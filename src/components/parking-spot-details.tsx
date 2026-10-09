import { ArrowLeft, MapPin, Clock, Car, Shield, Camera, Wifi, Car as CarIcon, Truck, Bike, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

interface ParkingSpotDetailsProps {
  onNavigate: (screen: string, data?: any) => void;
  spotData?: any;
}

export function ParkingSpotDetails({ onNavigate, spotData }: ParkingSpotDetailsProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");

  const defaultSpotData = {
    id: "DTP-A23",
    name: "Downtown Plaza",
    address: "123 Main Street, Downtown District",
    hourlyRate: 8.00,
    dailyRate: 45.00,
    features: ["Security Camera", "24/7 Access", "Covered Parking", "EV Charging", "WiFi Available"],
    restrictions: {
      maxHeight: "2.1m",
      vehicleTypes: ["Cars", "Motorcycles", "Small SUVs"]
    },
    availability: "Available",
    rating: 4.6,
    totalSpots: 50,
    availableSpots: 12
  };

  // If spotData is provided from Live Availability, use it
  const spot = spotData ? {
    id: spotData.id,
    name: spotData.name,
    address: spotData.location,
    hourlyRate: spotData.price,
    dailyRate: spotData.price * 8, // Estimate daily rate
    features: ["Security Camera", "24/7 Access", "Covered Parking"],
    restrictions: {
      maxHeight: "2.1m",
      vehicleTypes: ["Cars", "Motorcycles", "Small SUVs"]
    },
    availability: spotData.availability,
    rating: spotData.rating,
    totalSpots: spotData.totalSpots,
    availableSpots: spotData.availableSpots
  } : defaultSpotData;

  // Generate time options (24 hour format)
  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeOptions.push(timeString);
    }
  }

  // Duration options
  const durationOptions = [
    { value: "1", label: "1 hour" },
    { value: "2", label: "2 hours" },
    { value: "3", label: "3 hours" },
    { value: "4", label: "4 hours" },
    { value: "6", label: "6 hours" },
    { value: "8", label: "8 hours" },
    { value: "12", label: "12 hours" },
    { value: "24", label: "1 day" }
  ];

  const calculateTotalCost = () => {
    if (!selectedDuration) return 0;
    const hours = parseInt(selectedDuration);
    if (hours >= 24) {
      return spot.dailyRate * Math.ceil(hours / 24);
    }
    return spot.hourlyRate * hours;
  };

  const getVehicleIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "cars":
        return <CarIcon className="w-4 h-4" />;
      case "trucks":
        return <Truck className="w-4 h-4" />;
      case "motorcycles":
        return <Bike className="w-4 h-4" />;
      default:
        return <Car className="w-4 h-4" />;
    }
  };

  const getFeatureIcon = (feature: string) => {
    if (feature.toLowerCase().includes("camera") || feature.toLowerCase().includes("security")) {
      return <Camera className="w-4 h-4 text-blue-600" />;
    }
    if (feature.toLowerCase().includes("wifi")) {
      return <Wifi className="w-4 h-4 text-green-600" />;
    }
    return <Shield className="w-4 h-4 text-purple-600" />;
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
          <div>
            <h1 className="text-xl">Spot Details</h1>
            <p className="text-blue-200 text-sm">ID: {spot.id}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Spot Image */}
        <Card className="overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1620726068483-d4d53738ba48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJraW5nJTIwZ2FyYWdlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU4NjQ3MTM1fDA&ixlib=rb-4.1.0&q=80&w=1080" 
              alt="Parking spot interior"
              className="w-full h-full object-cover"
            />
          </div>
        </Card>

        {/* Basic Information */}
        <Card className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h2 className="text-xl font-medium">{spot.name}</h2>
              <div className="flex items-center space-x-1 mt-1">
                <div className="flex text-yellow-400">
                  {"★".repeat(Math.floor(spot.rating))}
                  {"☆".repeat(5 - Math.floor(spot.rating))}
                </div>
                <span className="text-sm text-gray-600">({spot.rating})</span>
              </div>
            </div>
            <Badge 
              className={`${
                spot.availability === 'Available' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {spot.availability}
            </Badge>
          </div>
          
          <div className="flex items-start space-x-2 mb-4">
            <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
            <p className="text-gray-600">{spot.address}</p>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>{spot.availableSpots} of {spot.totalSpots} spots available</span>
            <span>Updated 2 min ago</span>
          </div>
        </Card>

        {/* Reservation Details */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">Reservation Details</h3>
          <div className="space-y-4">
            {/* Date Selection */}
            <div>
              <Label htmlFor="date" className="text-sm font-medium">Date</Label>
              <div className="relative mt-1">
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <Label htmlFor="time" className="text-sm font-medium">Start Time</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Duration Selection */}
            <div>
              <Label htmlFor="duration" className="text-sm font-medium">Duration</Label>
              <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Pricing */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Pricing</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-medium text-[#1B1F73]">₹{spot.hourlyRate.toFixed(2)}</p>
              <p className="text-sm text-gray-600">per hour</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-medium text-green-600">₹{spot.dailyRate.toFixed(2)}</p>
              <p className="text-sm text-gray-600">per day</p>
              <p className="text-xs text-green-600">Save 25%</p>
            </div>
          </div>
          
          {selectedDuration && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Cost:</span>
                <span className="text-xl font-medium text-[#1B1F73]">₹{calculateTotalCost().toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {selectedDuration} hour{parseInt(selectedDuration) > 1 ? 's' : ''} × ₹{spot.hourlyRate.toFixed(2)}
              </p>
            </div>
          )}
        </Card>

        {/* Features */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Features & Amenities</h3>
          <div className="grid grid-cols-1 gap-3">
            {spot.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                {getFeatureIcon(feature)}
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Restrictions */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Vehicle Restrictions</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 mb-2">Maximum Height</p>
              <div className="flex items-center space-x-2">
                <Car className="w-4 h-4 text-gray-400" />
                <span className="font-medium">{spot.restrictions.maxHeight}</span>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Allowed Vehicle Types</p>
              <div className="flex flex-wrap gap-2">
                {spot.restrictions.vehicleTypes.map((type, index) => (
                  <Badge key={index} variant="outline" className="flex items-center space-x-1">
                    {getVehicleIcon(type)}
                    <span>{type}</span>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Operating Hours */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Operating Hours</h3>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">24/7 Access Available</span>
          </div>
        </Card>

        {/* Reserve Button */}
        <div className="pb-20">
          <Button 
            onClick={() => onNavigate('payment', {
              spot,
              date: selectedDate,
              time: selectedTime,
              duration: selectedDuration,
              totalCost: calculateTotalCost()
            })}
            className="w-full bg-[#1B1F73] hover:bg-[#1B1F73]/90 h-12"
            disabled={!selectedDate || !selectedTime || !selectedDuration}
          >
            {selectedDuration ? `Reserve This Spot - ₹${calculateTotalCost().toFixed(2)}` : 'Reserve This Spot'}
          </Button>
        </div>
      </div>
    </div>
  );
}