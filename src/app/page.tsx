import Link from 'next/link';
import { 
  Calendar, 
  Star, 
  TrendingUp,
  Building2 
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-xl font-semibold text-gray-900">
                Rue Lucas - Dashboard Admin
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              Gestion des réservations et avis
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bienvenue sur votre dashboard
          </h2>
          <p className="text-gray-600">
            Gérez facilement vos réservations et modérez les avis clients.
          </p>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Réservations</p>
                <p className="text-2xl font-bold text-gray-900">-</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avis clients</p>
                <p className="text-2xl font-bold text-gray-900">-</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Note moyenne</p>
                <p className="text-2xl font-bold text-gray-900">-</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/reservations" className="group">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Calendar className="h-10 w-10 text-blue-600" />
                <h3 className="ml-4 text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Gestion des Réservations
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Consultez, modifiez et gérez toutes les réservations de votre propriété.
              </p>
              <div className="flex items-center text-blue-600 font-medium">
                Accéder aux réservations
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>

          <Link href="/reviews" className="group">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Star className="h-10 w-10 text-yellow-600" />
                <h3 className="ml-4 text-xl font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">
                  Gestion des Avis
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Consultez et modérez les avis laissés par vos clients.
              </p>
              <div className="flex items-center text-yellow-600 font-medium">
                Accéder aux avis
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* API Status */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Status de l&apos;API
          </h3>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-2 text-sm text-gray-600">
              Connecté à : https://api-rue-lucas.vercel.app
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
