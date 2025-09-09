'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Star, 
  ArrowLeft, 
  Search,
  Building2,
  Calendar
} from 'lucide-react';

interface Review {
  _id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api-rue-lucas.vercel.app/api/reviews');
      const data: Review[] = await response.json();
      setReviews(data);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des avis');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
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
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
