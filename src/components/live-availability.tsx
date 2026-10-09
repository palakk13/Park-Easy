import { ArrowLeft, RefreshCw, Filter, MapPin, Clock, Star, Users, X, ChevronDown, Search, Navigation, Zap, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useMemo } from "react";

interface LiveAvailabilityProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function LiveAvailability({ onNavigate }: LiveAvailabilityProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState("list");
  const [maxDistance, setMaxDistance] = useState([5]);
  const [maxPrice, setMaxPrice] = useState([100]);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [evChargerRequired, setEvChargerRequired] = useState(false);
  const [sortBy, setSortBy] = useState("distance");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Smart search dataset
  const locationDataset = [
    // Major Cities
    "Mumbai, Maharashtra", "Delhi, NCR", "Bangalore, Karnataka", "Hyderabad, Telangana", 
    "Chennai, Tamil Nadu", "Kolkata, West Bengal", "Pune, Maharashtra", "Ahmedabad, Gujarat",
    "Jaipur, Rajasthan", "Surat, Gujarat", "Lucknow, Uttar Pradesh", "Kanpur, Uttar Pradesh",
    "Nagpur, Maharashtra", "Indore, Madhya Pradesh", "Thane, Maharashtra", "Bhopal, Madhya Pradesh",
    "Visakhapatnam, Andhra Pradesh", "Pimpri-Chinchwad, Maharashtra", "Patna, Bihar", "Vadodara, Gujarat",
    
    // Popular Areas/Neighborhoods
    "Hitech City, Hyderabad", "Cyber Towers, Hyderabad", "Gachibowli, Hyderabad", "Banjara Hills, Hyderabad",
    "Koramangala, Bangalore", "Whitefield, Bangalore", "Electronic City, Bangalore", "Indiranagar, Bangalore",
    "Connaught Place, Delhi", "Karol Bagh, Delhi", "Lajpat Nagar, Delhi", "Saket, Delhi",
    "Andheri, Mumbai", "Bandra, Mumbai", "Powai, Mumbai", "Worli, Mumbai",
    "Anna Nagar, Chennai", "T. Nagar, Chennai", "Adyar, Chennai", "Velachery, Chennai",
    "Salt Lake, Kolkata", "Park Street, Kolkata", "Ballygunge, Kolkata", "New Town, Kolkata",
    "Kothrud, Pune", "Hinjewadi, Pune", "Viman Nagar, Pune", "Aundh, Pune",
    
    // Malls & Shopping Centers
    "Select City Walk Mall, Saket", "DLF Mall of India, Noida", "Phoenix Marketcity, Bangalore",
    "Forum Mall, Bangalore", "Express Avenue, Chennai", "Phoenix MarketCity, Chennai",
    "Palladium Mall, Mumbai", "High Street Phoenix, Mumbai", "City Center Mall, Gurgaon",
    "Ambience Mall, Gurgaon", "Inorbit Mall, Hyderabad", "Forum Sujana Mall, Hyderabad",
    
    // Airports & Transport Hubs
    "Indira Gandhi International Airport, Delhi", "Chhatrapati Shivaji Airport, Mumbai",
    "Kempegowda International Airport, Bangalore", "Chennai International Airport, Chennai",
    "Rajiv Gandhi International Airport, Hyderabad", "Netaji Subhas Airport, Kolkata",
    "New Delhi Railway Station", "Mumbai Central Station", "Bangalore City Station",
    
    // Business Districts
    "Cyber City, Gurgaon", "Sector 62, Noida", "BKC, Mumbai", "Nariman Point, Mumbai",
    "UB City Mall, Bangalore", "Manyata Tech Park, Bangalore", "Hitec City, Hyderabad",
    "OMR, Chennai", "IT Corridor, Chennai", "Sector V, Salt Lake, Kolkata"
  ];

  const parkingSpots = [
    {
      id: "CT001",
      name: "Cyber Towers Premium",
      location: "Hitech City, Hyderabad",
      price: 35,
      priceUnit: "/hour",
      rating: 4.3,
      reviewCount: 203,
      distance: 0.5,
      driveTime: 5,
      availability: "Limited",
      availableSpots: 65,
      totalSpots: 250,
      status: "limited",
      image: "https://images.unsplash.com/photo-1668911128137-2f40fb6bde1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpaW5nJTIwZ2FyYWdlJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzU4NTM4OTkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      features: ["CCTV", "24/7 Security", "Covered"],
      type: "Premium",
      evCharging: true,
      qrCode: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2ZmZiIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjMDAwIi8+PC9zdmc+"
    },
    {
      id: "SCW001", 
      name: "Select City Walk Premium",
      location: "Saket, New Delhi",
      price: 52,
      priceUnit: "/hour",
      rating: 4.6,
      reviewCount: 374,
      distance: 0.8,
      driveTime: 13,
      availability: "Available",
      availableSpots: 120,
      totalSpots: 300,
      status: "good",
      image: "https://images.unsplash.com/photo-1698788261518-ce94f1d7f69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb3dudG93biUyMHBsYXphJTIwc2hvcHBpbmclMjBjZW50ZXJ8ZW58MXx8fHwxNzU4NjQ2MTg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      features: ["Valet Parking", "Mall Access", "Food Court"],
      type: "Mall Parking",
      evCharging: false,
      qrCode: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2ZmZiIvPjxyZWN0IHg9IjE1IiB5PSIxNSIgd2lkdGg9IjcwIiBoZWlnaHQ9IjcwIiBmaWxsPSIjMDAwIi8+PC9zdmc+"
    },
    {
      id: "DP001",
      name: "Downtown Plaza Elite",
      location: "MG Road, Bangalore",
      price: 45,
      priceUnit: "/hour", 
      rating: 4.1,
      reviewCount: 156,
      distance: 1.2,
      driveTime: 8,
      availability: "Good",
      availableSpots: 85,
      totalSpots: 150,
      status: "good",
      image: "https://images.unsplash.com/photo-1694702740570-0a31ee1525c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg1MzkzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      features: ["Prime Location", "Easy Access", "Business District"],
      type: "Business Hub",
      evCharging: true,
      qrCode: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2ZmZiIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMDAwIi8+PC9zdmc+"
    },
    {
      id: "CCM001",
      name: "City Center Luxury",
      location: "Sector 12, Gurgaon",
      price: 60,
      priceUnit: "/hour",
      rating: 4.5,
      reviewCount: 289,
      distance: 1.8,
      driveTime: 15,
      availability: "Excellent",
      availableSpots: 140,
      totalSpots: 200,
      status: "excellent",
      image: "https://images.unsplash.com/photo-1631507623104-aa66944677aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMG1lZGljYWwlMjBjZW50ZXJ8ZW58MXx8fHwxNzU4NjIwNDI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      features: ["Luxury Amenities", "Concierge", "Premium Services"],
      type: "Luxury",
      evCharging: true,
      qrCode: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2ZmZiIvPjxyZWN0IHg9IjI1IiB5PSIyNSIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjMDAwIi8+PC9zdmc+"
    }
  ];

  // Smart search functionality
  const filteredSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return locationDataset
      .filter(location => 
        location.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5);
  }, [searchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "limited":
        return "bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800 border-orange-200";
      case "good":
        return "bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-200";
      case "excellent":
        return "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusGradient = (status: string) => {
    switch (status) {
      case "limited":
        return "from-orange-400 to-orange-600";
      case "good":
        return "from-green-400 to-green-600";
      case "excellent":
        return "from-blue-400 to-blue-600";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const handleSpotClick = (spot: any) => {
    onNavigate('spot-details', spot);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  // On invalid input, call window.alert(message) and abort the handler
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      return;
    }
    
    // Check if the search query matches any location in the dataset
    const isValidLocation = locationDataset.some(location => 
      location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (!isValidLocation) {
      window.alert('Invalid location entered. Please check and try again.');
      return;
    }
    
    // Proceed with search if valid
    setShowSuggestions(false);
  };

  const resetFilters = () => {
    setMaxDistance([5]);
    setMaxPrice([100]);
    setOnlyAvailable(false);
    setEvChargerRequired(false);
    setSortBy("distance");
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
            <h1 className="text-xl font-medium">Live Availability</h1>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Smart Search Bar */}
        <div className="relative mb-4">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search locations, malls, areas..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                className="bg-white text-black pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setShowSuggestions(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
            <Button
              onClick={handleSearch}
              className="bg-white text-[#1B1F73] hover:bg-white/90"
              size="sm"
            >
              Search
            </Button>
          </div>
          
          {/* Smart Suggestions Dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-lg mt-2 z-10 max-h-60 overflow-y-auto">
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center space-x-3"
                >
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-gray-900 font-medium">
                      {suggestion.split(',')[0]}
                    </p>
                    <p className="text-sm text-gray-500">
                      {suggestion.split(',').slice(1).join(',').trim()}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filters Button */}
        <Button
          variant="outline"
          className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 mb-4"
          onClick={() => setIsFiltersOpen(true)}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters & Sort
        </Button>
      </div>

      {/* View Toggle */}
      <div className="bg-white border-b p-4">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <Button
            variant={currentView === "list" ? "default" : "ghost"}
            className={`flex-1 ${currentView === "list" ? "bg-[#1B1F73] text-white shadow-sm" : "text-gray-600"}`}
            onClick={() => setCurrentView("list")}
          >
            List View
          </Button>
          <Button
            variant={currentView === "map" ? "default" : "ghost"} 
            className={`flex-1 ${currentView === "map" ? "bg-[#1B1F73] text-white shadow-sm" : "text-gray-600"}`}
            onClick={() => setCurrentView("map")}
          >
            Map View
          </Button>
        </div>
      </div>

      {/* Content Area */}
      {currentView === "list" ? (
        <div className="p-4">
          {/* Near You Header */}
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-1">Available Near You</h2>
            <p className="text-sm text-gray-600">Live updates • Sorted by distance</p>
          </div>

          {/* Beautiful Parking Spots List */}
          <div className="space-y-6">
            {parkingSpots.map((spot) => (
              <Card 
                key={spot.id} 
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-md"
                onClick={() => handleSpotClick(spot)}
              >
                {/* Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={spot.image}
                    alt={spot.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getStatusColor(spot.status)} border font-medium px-3 py-1`}>
                      <div className={`w-2 h-2 rounded-full mr-2 bg-gradient-to-r ${getStatusGradient(spot.status)}`}></div>
                      {spot.availability}
                    </Badge>
                  </div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-gray-800 border-0">
                      {spot.type}
                    </Badge>
                  </div>
                  
                  {/* Price */}
                  <div className="absolute bottom-4 right-4 bg-white/95 rounded-lg px-3 py-2">
                    <div className="text-xl font-bold text-[#1B1F73]">₹{spot.price}</div>
                    <div className="text-xs text-gray-600">{spot.priceUnit}</div>
                  </div>
                  
                  {/* EV Charging Indicator */}
                  {spot.evCharging && (
                    <div className="absolute bottom-4 left-4 bg-green-500 text-white rounded-full p-2">
                      <Zap className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1 text-lg">{spot.name}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{spot.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 mb-3">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium text-gray-900">{spot.rating}</span>
                        <span className="text-sm text-gray-500">({spot.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {spot.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{spot.distance} km</p>
                      <p className="text-xs text-gray-600">Distance</p>
                    </div>
                    <div className="text-center border-x border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{spot.driveTime} min</p>
                      <p className="text-xs text-gray-600">Drive time</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">{spot.availableSpots}</p>
                      <p className="text-xs text-gray-600">Available</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button 
                      className="flex-1 bg-[#1B1F73] hover:bg-[#1B1F73]/90 h-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpotClick(spot);
                      }}
                    >
                      Book Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="px-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('navigation-support', { destination: spot.name, address: spot.location });
                      }}
                    >
                      <Navigation className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        /* Enhanced Map View */
        <div className="p-4">
          <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-inner flex items-center justify-center relative overflow-hidden">
            {/* Map Background with better styling */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
              {/* Street grid pattern */}
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(90deg, #e5e7eb 1px, transparent 1px),
                                linear-gradient(180deg, #e5e7eb 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}></div>
              
              {/* Enhanced parking areas */}
              {parkingSpots.map((spot, index) => (
                <div
                  key={spot.id}
                  className={`absolute rounded-lg shadow-md cursor-pointer transform hover:scale-110 transition-transform duration-200`}
                  style={{
                    left: `${15 + index * 20}%`,
                    top: `${20 + (index % 2) * 30}%`,
                    width: '60px',
                    height: '40px'
                  }}
                  onClick={() => handleSpotClick(spot)}
                >
                  <div className={`w-full h-full bg-gradient-to-br ${getStatusGradient(spot.status)} rounded-lg opacity-80 flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">{spot.availableSpots}</span>
                  </div>
                  {/* Price tag */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-2 py-1 shadow text-xs font-medium whitespace-nowrap">
                    ₹{spot.price}/hr
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Legend */}
            <div className="absolute top-4 left-4 bg-white rounded-xl p-4 shadow-lg">
              <h4 className="font-semibold mb-3 text-gray-900">Live Status</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded mr-3"></div>
                  <span>Excellent</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-600 rounded mr-3"></div>
                  <span>Good</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-orange-600 rounded mr-3"></div>
                  <span>Limited</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-red-600 rounded mr-3"></div>
                  <span>Full</span>
                </div>
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
              <Button size="sm" className="bg-white text-gray-700 hover:bg-gray-50 shadow-md">+</Button>
              <Button size="sm" className="bg-white text-gray-700 hover:bg-gray-50 shadow-md">-</Button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Filters Modal */}
      {isFiltersOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-16">
          <div className="bg-white rounded-t-2xl w-full max-w-[390px] min-h-[400px] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Filters & Sort</h2>
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={resetFilters}
                  className="text-gray-600"
                >
                  Reset All
                </Button>
                <button onClick={() => setIsFiltersOpen(false)}>
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Max Distance */}
              <div>
                <label className="font-medium mb-3 block text-gray-900">Max Distance: {maxDistance[0]} km</label>
                <Slider
                  value={maxDistance}
                  onValueChange={setMaxDistance}
                  max={10}
                  min={0.5}
                  step={0.5}
                  className="w-full [&_[role=slider]]:bg-[#1B1F73] [&_[role=slider]]:border-[#1B1F73]"
                />
              </div>

              {/* Max Price */}
              <div>
                <label className="font-medium mb-3 block text-gray-900">Max Price: ₹{maxPrice[0]}/hr</label>
                <Slider
                  value={maxPrice}
                  onValueChange={setMaxPrice}
                  max={200}
                  min={10}
                  step={5}
                  className="w-full [&_[role=slider]]:bg-[#1B1F73] [&_[role=slider]]:border-[#1B1F73]"
                />
              </div>

              {/* Toggle Options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900">Only Available Spots</span>
                    <p className="text-sm text-gray-600">Show only spots with availability</p>
                  </div>
                  <Switch
                    checked={onlyAvailable}
                    onCheckedChange={setOnlyAvailable}
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900">EV Charging Required</span>
                    <p className="text-sm text-gray-600">Filter spots with EV charging</p>
                  </div>
                  <Switch
                    checked={evChargerRequired}
                    onCheckedChange={setEvChargerRequired}
                  />
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="font-medium mb-3 block text-gray-900">Sort by</label>
                <div className="relative">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-3 border rounded-lg appearance-none bg-white text-gray-900 border-gray-300 focus:border-[#1B1F73] focus:ring-1 focus:ring-[#1B1F73]"
                  >
                    <option value="distance">Distance (Nearest First)</option>
                    <option value="price">Price (Low to High)</option>
                    <option value="rating">Rating (Highest First)</option>
                    <option value="availability">Availability (Most Available)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <Button 
              className="w-full mt-8 bg-[#1B1F73] hover:bg-[#1B1F73]/90 h-12"
              onClick={() => setIsFiltersOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}