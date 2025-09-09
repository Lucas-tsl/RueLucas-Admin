'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  Star, 
  ArrowLeft, 
  Search,
  Building2,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import ReviewModal from '../../components/ReviewModal';
import { ApiReview, PaginatedResponse, ReviewForm } from '../../types';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ApiReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ApiReview | undefined>();

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10'
      });
      
      if (search) params.append('search', search);

      const response = await fetch(`https://api-rue-lucas.vercel.app/api/reviews?${params}`);
      const data: ApiReview[] = await response.json();
      
      // Si la réponse est un array simple, on adapte
      if (Array.isArray(data)) {
        setReviews(data);
        setTotal(data.length);
        setTotalPages(1);
      } else {
        // Si c'est un objet avec pagination
        const paginatedData = data as PaginatedResponse<ApiReview>;
        setReviews(paginatedData.items || []);
        setTotal(paginatedData.total || 0);
        setTotalPages(paginatedData.pages || 1);
      }
      
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des avis');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, search]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleCreateReview = () => {
    setSelectedReview(undefined);
    setIsModalOpen(true);
  };

  const handleEditReview = (review: ApiReview) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleDeleteReview = async (id: string) => {
    // Note: L'API ne supporte pas encore la suppression des avis
    alert('⚠️ Fonctionnalité non disponible\n\nLa suppression des avis n\'est pas encore implémentée dans l\'API.\nContactez le développeur pour ajouter cette fonctionnalité.');
    return;

    // Code pour quand l'API sera mise à jour :
    /*
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
      return;
    }

    try {
      console.log('Tentative de suppression de l\'avis ID:', id);
      const response = await fetch(`https://api-rue-lucas.vercel.app/api/reviews/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Réponse de suppression:', response.status, response.statusText);

      if (response.ok) {
        console.log('Suppression réussie, rechargement des avis...');
        await fetchReviews();
        alert('Avis supprimé avec succès');
      } else {
        const errorText = await response.text();
        console.error('Erreur de suppression:', response.status, errorText);
        alert(`Erreur lors de la suppression: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      alert(`Erreur réseau lors de la suppression: ${error}`);
    }
    */
  };

  const handleSaveReview = async (reviewData: Partial<ReviewForm>) => {
    try {
      if (selectedReview) {
        // Modification d'un avis existant - pas encore supporté par l'API
        alert('⚠️ Fonctionnalité non disponible\n\nLa modification des avis n\'est pas encore implémentée dans l\'API.\nContactez le développeur pour ajouter cette fonctionnalité.');
        return;
      }

      // Création d'un nouvel avis - supporté par l'API
      const response = await fetch('https://api-rue-lucas.vercel.app/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
      });

      if (response.ok) {
        await fetchReviews();
        setIsModalOpen(false);
        setSelectedReview(undefined);
        alert('Avis créé avec succès !');
      } else {
        const errorText = await response.text();
        console.error('Erreur de création:', response.status, errorText);
        alert(`Erreur lors de la création: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert(`Erreur lors de la sauvegarde: ${error}`);
    }
  };

  const filteredReviews = reviews.filter(review =>
    review.author.toLowerCase().includes(search.toLowerCase()) ||
    review.comment.toLowerCase().includes(search.toLowerCase())
  );

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const ratingCounts: Record<number, number> = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number, size: 'sm' | 'lg' = 'sm') => {
    const stars = [];
    const sizeClass = size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`${sizeClass} ${
            i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      );
    }
    return stars;
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600 bg-green-50';
    if (rating >= 3) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
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
              <Building2 className="h-8 w-8 text-yellow-600" />
              <h1 className="ml-3 text-xl font-semibold text-gray-900">
                Gestion des Avis
              </h1>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => {
                  setSelectedReview(undefined);
                  setIsModalOpen(true);
                }}
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Nouvel Avis</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">État des fonctionnalités</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  ✅ <strong>Consultation</strong> et <strong>Création</strong> d'avis : Fonctionnelles<br/>
                  ⚠️ <strong>Modification</strong> et <strong>Suppression</strong> : En attente de mise à jour de l'API
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Avis</p>
                <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex">
                {renderStars(Math.round(averageRating), 'lg')}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Note Moyenne</p>
                <p className="text-2xl font-bold text-gray-900">
                  {averageRating.toFixed(1)}/5
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">5★</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Excellents</p>
                <p className="text-2xl font-bold text-gray-900">{ratingCounts[5]}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Ce mois</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reviews.filter(r => 
                    new Date(r.date).getMonth() === new Date().getMonth()
                  ).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Répartition des notes</h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <div className="flex items-center w-12">
                  <span className="text-sm font-medium text-gray-700">{rating}</span>
                  <Star className="h-4 w-4 text-yellow-400 ml-1 fill-current" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    {/* Dynamic width for progress bar */}
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${reviews.length > 0 ? (ratingCounts[rating as keyof typeof ratingCounts] / reviews.length) * 100 : 0}%`
                      }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">
                  {ratingCounts[rating as keyof typeof ratingCounts]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher dans les avis..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Reviews List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Avis clients ({filteredReviews.length})
            </h3>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
              <p className="mt-2 text-gray-600">Chargement...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-red-600">{error}</p>
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">
                {search ? 'Aucun avis trouvé pour cette recherche' : 'Aucun avis disponible'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredReviews.map((review) => (
                <div key={review._id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="text-lg font-medium text-gray-900 mr-3">
                          {review.author}
                        </h4>
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                          <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getRatingColor(review.rating)}`}>
                            {review.rating}/5
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3 leading-relaxed">
                        {review.comment}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(review.date)}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button 
                        onClick={() => {
                          alert('⚠️ Fonctionnalité non disponible\n\nLa modification des avis n\'est pas encore implémentée dans l\'API.\nContactez le développeur pour ajouter cette fonctionnalité.');
                        }}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-not-allowed"
                        title="Modifier l'avis (fonctionnalité non disponible)"
                        disabled
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteReview(review._id)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-not-allowed"
                        title="Supprimer l'avis (fonctionnalité non disponible)"
                        disabled
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedReview(undefined);
        }}
        review={selectedReview}
        onSave={handleSaveReview}
      />
    </div>
  );
}
