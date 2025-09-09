'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { 
  Calendar, 
  ArrowLeft, 
  Search,
  Building2,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';

// Import dynamique pour éviter l'hydratation
const ReservationModal = dynamic(() => import('../../components/ReservationModal'), {
  ssr: false
});

interface Reservation {
  _id: string;
  code: string;
  status: 'pending' | 'paid' | 'cancelled';
  email: string;
  phoneNumber: string;
  firstName: string;
  surname: string;
  street: string;
  postcode: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  paymentMethod: string;
  amountTotal: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  items: Reservation[];
  total: number;
  page: number;
  pages: number;
}

export default function ReservationsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | undefined>();

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchReservations = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10'
      });
      
      if (search) params.append('search', search);
      if (statusFilter) params.append('status', statusFilter);

      const response = await fetch(`https://api-rue-lucas.vercel.app/reservations?${params}`);
      const data: ApiResponse = await response.json();
      
      setReservations(data.items);
      setTotal(data.total);
      setTotalPages(data.pages);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des réservations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, statusFilter]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const handleCreateReservation = () => {
    setSelectedReservation(undefined);
    setIsModalOpen(true);
  };

  const handleEditReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const handleDeleteReservation = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      return;
    }

    try {
      setLoading(true);
      console.log('URL DELETE:', `https://api-rue-lucas.vercel.app/reservations/${id}`);
      
      const response = await fetch(`https://api-rue-lucas.vercel.app/reservations/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        await fetchReservations();
        alert('Réservation supprimée avec succès');
      } else {
        const errorText = await response.text();
        console.error('Erreur de suppression:', response.status, errorText);
        
        // Vérifier si c'est un problème d'API non implémentée
        if (response.status === 404) {
          alert('⚠️ Fonctionnalité non disponible\n\nL\'API ne supporte pas encore la suppression de réservations.\nSeule la consultation est disponible pour le moment.');
        } else {
          alert(`Erreur lors de la suppression: ${response.status} - ${errorText}`);
        }
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      alert(`Erreur réseau lors de la suppression: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveReservation = async (reservationData: any) => {
    try {
      let response;
      
      if (selectedReservation) {
        // Modification d'une réservation existante
        console.log('=== MODIFICATION RÉSERVATION ===');
        console.log('Données modifiées:', reservationData);
        console.log('ID réservation:', selectedReservation._id);
        console.log('URL PUT:', `https://api-rue-lucas.vercel.app/reservations/${selectedReservation._id}`);
        
        response = await fetch(`https://api-rue-lucas.vercel.app/reservations/${selectedReservation._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reservationData)
        });
      } else {
        // Création d'une nouvelle réservation - supportée
        console.log('=== CRÉATION RÉSERVATION ===');
        console.log('Nouvelles données:', reservationData);
        console.log('URL POST:', 'https://api-rue-lucas.vercel.app/reservations');
        
        response = await fetch('https://api-rue-lucas.vercel.app/reservations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reservationData)
        });
      }

      console.log('Réponse API:', response.status, response.statusText);

      if (response.ok) {
        // Fermer le modal IMMÉDIATEMENT
        setIsModalOpen(false);
        setSelectedReservation(undefined);
        
        // Afficher le message de succès
        const action = selectedReservation ? 'modifiée' : 'créée';
        alert(`Réservation ${action} avec succès !`);
        
        // Recharger les réservations
        await fetchReservations();
        
      } else {
        const errorText = await response.text();
        console.error('Erreur de sauvegarde:', response.status, errorText);
        alert(`Erreur lors de la sauvegarde: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      alert(`Erreur réseau lors de la sauvegarde: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Payée';
      case 'cancelled': return 'Annulée';
      default: return 'En attente';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Date non définie';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Date invalide' : date.toLocaleDateString('fr-FR');
  };

  const formatCurrency = (amount: number) => {
    if (typeof amount !== 'number' || isNaN(amount)) return '0,00 €';
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="mr-4">
                <ArrowLeft className="h-6 w-6 text-gray-600 hover:text-gray-900" />
              </Link>
              <Building2 className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-xl font-semibold text-gray-900">
                Gestion des Réservations
              </h1>
            </div>
            <div className="flex space-x-3">
              {mounted && (
                <button 
                  type="button"
                  onClick={handleCreateReservation}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Nouvelle Réservation</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Réservations</p>
                <p className="text-2xl font-bold text-gray-900">{total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">En attente</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reservations.filter(r => r.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Payées</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reservations.filter(r => r.status === 'paid').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher par nom, email, code..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="Filtrer par statut"
              >
                <option value="">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="paid">Payée</option>
                <option value="cancelled">Annulée</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reservations Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Liste des réservations</h3>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Chargement...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-red-600">{error}</p>
            </div>
          ) : reservations.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">Aucune réservation trouvée</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Montant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reservations.map((reservation) => (
                    <tr key={reservation._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {reservation.code}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(reservation.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {reservation.firstName} {reservation.surname}
                        </div>
                        <div className="text-sm text-gray-500">
                          {reservation.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Du {formatDate(reservation.startDate)}
                        </div>
                        <div className="text-sm text-gray-500">
                          Au {formatDate(reservation.endDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(reservation.amountTotal)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {reservation.paymentMethod}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.status)}`}>
                          {getStatusText(reservation.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => alert('Fonctionnalité de visualisation à implémenter')}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Voir les détails"
                            aria-label="Voir les détails de la réservation"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleEditReservation(reservation)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Modifier"
                            aria-label="Modifier la réservation"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteReservation(reservation._id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                            aria-label="Supprimer la réservation"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Affichage de {((currentPage - 1) * 10) + 1} à {Math.min(currentPage * 10, total)} sur {total} réservations
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
                >
                  Précédent
                </button>
                <span className="px-3 py-1 text-sm">
                  Page {currentPage} sur {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
                >
                  Suivant
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Reservation Modal */}
      {mounted && (
        <ReservationModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedReservation(undefined);
          }}
          reservation={selectedReservation}
          onSave={handleSaveReservation}
        />
      )}
    </div>
  );
}
