import { useState } from 'react';
import { Login } from './components/auth/login';
import { Register } from './components/auth/register';
import { Dashboard } from './components/dashboard';
import { UserProfile } from './components/user-profile';
import { ReservationDetails } from './components/reservation-details';
import { Notifications } from './components/notifications';
import { Payment } from './components/payment';
import { Confirmation } from './components/confirmation';
import { ParkingSpotDetails } from './components/parking-spot-details';
import { ModifyReservation } from './components/modify-reservation';
import { CancelReservation } from './components/cancel-reservation';
import { ParkingHistory } from './components/parking-history';
import { LiveAvailability } from './components/live-availability';
import { PushNotifications } from './components/push-notifications';
import { NavigationSupport } from './components/navigation-support';
import { PaymentMethods } from './components/payment-methods';
import { UserPreferences } from './components/user-preferences';
import { EVChargingStations } from './components/ev-charging-stations';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [screenData, setScreenData] = useState<any>(null);

  const handleNavigate = (screen: string, data?: any) => {
    setCurrentScreen(screen);
    setScreenData(data);
  };

  const handleLogin = (user?: any) => {
    setIsAuthenticated(true);
    if (user) {
      setCurrentUser(user);
    }
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentScreen('login');
  };

  const renderScreen = () => {
    // If not authenticated, show auth screens
    if (!isAuthenticated) {
      switch (currentScreen) {
        case 'register':
          return <Register onNavigate={handleNavigate} onLogin={handleLogin} />;
        case 'login':
        default:
          return <Login onNavigate={handleNavigate} onLogin={handleLogin} />;
      }
    }

    // If authenticated, show main app screens
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} onLogout={handleLogout} currentUser={currentUser} />;
      case 'user-profile':
        return <UserProfile onNavigate={handleNavigate} onLogout={handleLogout} user={currentUser} />;
      case 'spot-details':
        return <ParkingSpotDetails onNavigate={handleNavigate} spotData={screenData} />;
      case 'reservation':
        return <ReservationDetails onNavigate={handleNavigate} />;
      case 'modify-reservation':
        return <ModifyReservation onNavigate={handleNavigate} />;
      case 'cancel-reservation':
        return <CancelReservation onNavigate={handleNavigate} />;
      case 'notifications':
        return <Notifications onNavigate={handleNavigate} />;
      case 'payment':
        return <Payment onNavigate={handleNavigate} reservationData={screenData} />;
      case 'confirmation':
        return <Confirmation onNavigate={handleNavigate} />;
      case 'parking-history':
        return <ParkingHistory onNavigate={handleNavigate} />;
      case 'live-availability':
        return <LiveAvailability onNavigate={handleNavigate} />;
      case 'push-notifications':
        return <PushNotifications onNavigate={handleNavigate} />;
      case 'navigation-support':
        return <NavigationSupport onNavigate={handleNavigate} />;
      case 'payment-methods':
        return <PaymentMethods onNavigate={handleNavigate} />;
      case 'user-preferences':
        return <UserPreferences onNavigate={handleNavigate} />;
      case 'ev-charging-stations':
        return <EVChargingStations onNavigate={handleNavigate} />;
      default:
        return <Dashboard onNavigate={handleNavigate} onLogout={handleLogout} currentUser={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen max-w-[390px] mx-auto bg-white">
      {renderScreen()}
    </div>
  );
}