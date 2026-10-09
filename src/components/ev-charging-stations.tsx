import { ArrowLeft, Zap, MapPin, Clock, Filter, Grid, Map, Star, Navigation, Battery, Car, Shield, Search, X, Wifi, Coffee, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

interface EVChargingStationsProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function EVChargingStations({ onNavigate }: EVChargingStationsProps) {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Location dataset for validation
  const validLocations = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad",
    "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal",
    "Downtown", "Midtown", "Tech Park", "Central Plaza", "Shopping District", "Mall Complex",
    "Electric Ave", "Green Street", "Innovation Hub", "Metro Station", "Airport"
  ];

  // On invalid input/state, call window.alert(message) and abort the handler
  const handleLocationSearch = () => {
    if (!searchQuery.trim()) {
      return;
    }
    
    // Check if the search query matches any valid location
    const isValidLocation = validLocations.some(location => 
      location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      searchQuery.toLowerCase().includes(location.toLowerCase())
    );
    
    if (!isValidLocation) {
      window.alert('Invalid location entered. Please check and try again.');
      return;
    }
    
    // Proceed with search if valid
    console.log('Searching for charging stations in:', searchQuery);
  };

  const chargingStations = [
    {
      id: '1',
      name: 'Tesla Supercharger Hub',
      address: '456 Electric Ave, Downtown',
      distance: '0.8 km',
      rating: 4.8,
      reviews: 324,
      status: 'available',
      availableChargers: 8,
      totalChargers: 12,
      chargingSpeed: '150 kW',
      connectorTypes: ['Tesla', 'CCS'],
      price: '₹12/kWh',
      estimatedTime: '45 min',
      amenities: ['WiFi', 'Restroom', 'Cafe', 'Lounge'],
      image: 'https://images.unsplash.com/photo-1694266475815-19ded81303fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXNsYSUyMHN1cGVyY2hhcmdlciUyMHN0YXRpb258ZW58MXx8fHwxNzU4NjQ2MTk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'Supercharger',
      brand: 'Tesla',
      openHours: '24/7',
      features: ['Premium', 'Ultra Fast', 'Tesla Network']
    },
    {
      id: '2',
      name: 'Shell Recharge Station',
      address: '789 Green Street, Midtown',
      distance: '1.2 km',
      rating: 4.6,
      reviews: 189,
      status: 'busy',
      availableChargers: 2,
      totalChargers: 6,
      chargingSpeed: '50 kW',
      connectorTypes: ['CCS', 'CHAdeMO', 'Type 2'],
      price: '₹10/kWh',
      estimatedTime: '1.2 hr',
      amenities: ['Shop', 'Parking', 'Security', 'Snacks'],
      image: 'https://images.unsplash.com/photo-1619913387719-a43ee8859d9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGNhciUyMGNoYXJnaW5nJTIwc3RhdGlvbnxlbnwxfHx8fDE3NTg2MzMxNDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'Fast Charging',
      brand: 'Shell',
      openHours: '6:00 AM - 10:00 PM',
      features: ['Retail Partner', 'Fast Charging', 'Convenient']
    },
    {
      id: '3',
      name: 'TATA Power EZ Charge',
      address: '321 Innovation Hub, Tech Park',
      distance: '2.1 km',
      rating: 4.4,
      reviews: 167,
      status: 'available',
      availableChargers: 5,
      totalChargers: 8,
      chargingSpeed: '60 kW',
      connectorTypes: ['CCS', 'Type 2'],
      price: '₹8/kWh',
      estimatedTime: '1.5 hr',
      amenities: ['Food Court', 'WiFi', 'Waiting Area', 'Business Center'],
      image: 'https://images.unsplash.com/photo-1694266475815-19ded81303fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXNsYSUyMHN1cGVyY2hhcmdlciUyMHN0YXRpb258ZW58MXx8fHwxNzU4NjQ2MTk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'Public Charging',
      brand: 'TATA Power',
      openHours: '24/7',
      features: ['Tech Hub', 'Business Friendly', 'Reliable']
    },
    {
      id: '4',
      name: 'Ather Grid Station',
      address: '654 Metro Station, Central Plaza',
      distance: '2.8 km',
      rating: 4.7,
      reviews: 256,
      status: 'maintenance',
      availableChargers: 0,
      totalChargers: 4,
      chargingSpeed: '25 kW',
      connectorTypes: ['Type 2'],
      price: '₹6/kWh',
      estimatedTime: '2.5 hr',
      amenities: ['Metro Access', 'Covered Parking', 'Digital Display'],
      image: 'https://images.unsplash.com/photo-1619913387719-a43ee8859d9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGNhciUyMGNoYXJnaW5nJTIwc3RhdGlvbnxlbnwxfHx8fDE3NTg2MzMxNDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'Smart Charging',
      brand: 'Ather',
      openHours: '24/7',
      features: ['Smart Grid', 'Metro Connected', 'Digital Experience']
    },
    {
      id: '5',
      name: 'ChargePoint Network Hub',
      address: '987 Mall Complex, Shopping District',
      distance: '3.5 km',
      rating: 4.5,
      reviews: 403,
      status: 'available',
      availableChargers: 12,
      totalChargers: 16,
      chargingSpeed: '22 kW',
      connectorTypes: ['Type 2', 'CCS'],
      price: '₹7/kWh',
      estimatedTime: '3 hr',
      amenities: ['Shopping Mall', 'Cinema', 'Food Court', 'Free Parking', 'Entertainment'],
      image: 'https://images.unsplash.com/photo-1694266475815-19ded81303fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXNsYSUyMHN1cGVyY2hhcmdlciUyMHN0YXRpb258ZW58MXx8fHwxNzU4NjQ2MTk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'Destination Charging',
      brand: 'ChargePoint',
      openHours: '10:00 AM - 10:00 PM',
      features: ['Mall Charging', 'Entertainment Hub', 'Family Friendly']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-200';
      case 'busy':
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 border-yellow-200';
      case 'maintenance':
        return 'bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusGradient = (status: string) => {
    switch (status) {
      case 'available':
        return 'from-green-400 to-green-600';
      case 'busy':
        return 'from-yellow-400 to-yellow-600';
      case 'maintenance':
        return 'from-red-400 to-red-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'busy':
        return 'Busy';
      case 'maintenance':
        return 'Maintenance';
      default:
        return 'Unknown';
    }
  };

  const filteredStations = chargingStations.filter(station => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'available') return station.status === 'available';
    if (selectedFilter === 'fast') return parseInt(station.chargingSpeed) >= 50;
    if (selectedFilter === 'nearby') return parseFloat(station.distance) <= 2.0;
    return true;
  });

  const handleStationClick = (station: any) => {
    onNavigate('navigation-support', { 
      destination: station.name,
      address: station.address,
      type: 'charging-station'
    });
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
              <h1 className="text-xl">EV Charging Stations</h1>
              <p className="text-blue-200 text-sm">Find nearby charging points</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              {viewMode === 'list' ? <Map className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Location Search Bar */}
        <div className="relative mb-4">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by location, area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleLocationSearch();
                  }
                }}
                className="bg-white text-black pl-10 pr-4"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
            <Button
              onClick={handleLocationSearch}
              className="bg-white text-[#1B1F73] hover:bg-white/90"
              size="sm"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{chargingStations.filter(s => s.status === 'available').length}</p>
            <p className="text-blue-200 text-xs">Available</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{chargingStations.reduce((sum, s) => sum + s.availableChargers, 0)}</p>
            <p className="text-blue-200 text-xs">Open Chargers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">₹6-12</p>
            <p className="text-blue-200 text-xs">Price Range</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white p-4 border-b">
          <div className="flex space-x-2 overflow-x-auto">
            {[
              { key: 'all', label: 'All Stations', icon: Zap },
              { key: 'available', label: 'Available', icon: Battery },
              { key: 'fast', label: 'Fast Charging', icon: Zap },
              { key: 'nearby', label: 'Nearby', icon: MapPin }
            ].map(filter => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedFilter === filter.key
                    ? 'bg-[#1B1F73] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <filter.icon className="w-4 h-4" />
                <span className="text-sm">{filter.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'map' ? (
        /* Map View */
        <div className="h-80 bg-gray-200 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50">
            {/* Map Background */}
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(90deg, #e5e7eb 1px, transparent 1px),
                              linear-gradient(180deg, #e5e7eb 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}></div>
            
            {/* Charging Station Markers */}
            {filteredStations.slice(0, 5).map((station, index) => (
              <button
                key={station.id}
                onClick={() => handleStationClick(station)}
                className={`absolute w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 ${
                  station.status === 'available' ? 'bg-green-500' : 
                  station.status === 'busy' ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{
                  left: `${20 + index * 15}%`,
                  top: `${30 + (index % 2) * 20}%`
                }}
              >
                <Zap className="w-4 h-4 text-white" />
              </button>
            ))}
            
            {/* Current Location */}
            <div className="absolute bottom-20 left-10 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg">
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping"></div>
            </div>
          </div>
          
          {/* Map Controls */}
          <div className="absolute top-4 right-4 space-y-2">
            <Button size="sm" variant="outline" className="bg-white/90">+</Button>
            <Button size="sm" variant="outline" className="bg-white/90">-</Button>
          </div>
        </div>
      ) : null}

      <div className="p-4 space-y-4">
        {/* Beautiful Station Cards */}
        <div className="space-y-6">
          {filteredStations.map((station) => (
            <Card 
              key={station.id} 
              className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
              onClick={() => handleStationClick(station)}
            >
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={station.image}
                  alt={station.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className={`${getStatusColor(station.status)} border font-medium px-3 py-1`}>
                    <div className={`w-2 h-2 rounded-full mr-2 bg-gradient-to-r ${getStatusGradient(station.status)}`}></div>
                    {getStatusText(station.status)}
                  </Badge>
                </div>
                
                {/* Brand Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/95 text-gray-800 border-0 font-semibold">
                    {station.brand}
                  </Badge>
                </div>
                
                {/* Price */}
                <div className="absolute bottom-4 right-4 bg-green-500 text-white rounded-lg px-3 py-2">
                  <div className="text-lg font-bold">{station.price}</div>
                  <div className="text-xs opacity-90">per kWh</div>
                </div>
                
                {/* Charging Speed */}
                <div className="absolute bottom-4 left-4 bg-blue-500 text-white rounded-lg px-3 py-2 flex items-center">
                  <Zap className="w-4 h-4 mr-1" />
                  <span className="font-semibold">{station.chargingSpeed}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1 text-lg">{station.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{station.address}</span>
                    </div>
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold text-gray-900">{station.rating}</span>
                      <span className="text-sm text-gray-500">({station.reviews} reviews)</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {station.openHours}
                    </div>
                  </div>
                </div>

                {/* Type Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {station.features.map((feature, index) => (
                    <Badge key={index} className="bg-blue-50 text-blue-700 border-blue-200">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                  <div className="text-center">
                    <p className="text-sm font-bold text-green-600">{station.availableChargers}</p>
                    <p className="text-xs text-gray-600">Available</p>
                  </div>
                  <div className="text-center border-x border-gray-300">
                    <p className="text-sm font-bold text-gray-900">{station.distance}</p>
                    <p className="text-xs text-gray-600">Distance</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-blue-600">{station.estimatedTime}</p>
                    <p className="text-xs text-gray-600">Est. Time</p>
                  </div>
                </div>

                {/* Connector Types */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Connector Types:</p>
                  <div className="flex flex-wrap gap-2">
                    {station.connectorTypes.map((type) => (
                      <Badge key={type} variant="outline" className="text-xs bg-white border-gray-300">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Amenities:</p>
                  <div className="flex flex-wrap gap-2">
                    {station.amenities.map((amenity) => (
                      <Badge key={amenity} className="bg-green-50 text-green-700 border-green-200 text-xs">
                        {amenity === 'WiFi' && <Wifi className="w-3 h-3 mr-1" />}
                        {amenity === 'Cafe' && <Coffee className="w-3 h-3 mr-1" />}
                        {amenity === 'Shopping Mall' && <ShoppingBag className="w-3 h-3 mr-1" />}
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white h-11"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStationClick(station);
                    }}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Start Charging
                  </Button>
                  <Button 
                    variant="outline" 
                    className="px-4 border-gray-300 hover:bg-gray-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStationClick(station);
                    }}
                  >
                    <Navigation className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-green-800">EV Tips</h3>
              <p className="text-sm text-green-700">
                Plan your charging stops during longer trips and always keep your battery above 20%.
              </p>
            </div>
          </div>
        </Card>

        {/* Emergency Support */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-[#1B1F73]" />
              <div>
                <h3 className="font-medium">24/7 EV Support</h3>
                <p className="text-sm text-gray-500">Need help with charging?</p>
              </div>
            </div>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => alert('Connecting to EV support...')}
            >
              Call Support
            </Button>
          </div>
        </Card>

        <div className="pb-20"></div>
      </div>
    </div>
  );
}