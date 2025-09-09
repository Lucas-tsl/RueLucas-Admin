'use client';

import { useState, useEffect } from 'react';
import { X, Save, Loader, Star } from 'lucide-react';
import { ApiReview, ReviewForm } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  review?: ApiReview;
  onSave: (review: Partial<ReviewForm>) => Promise<void>;
}

export default function ReviewModal({ isOpen, onClose, review, onSave }: ReviewModalProps) {
  const [formData, setFormData] = useState({
    author: '',
    rating: 5,
    comment: '',
    status: 'pending' as 'pending' | 'approved' | 'rejected'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (review) {
      setFormData({
        author: review.author,
        rating: review.rating,
        comment: review.comment,
        status: review.status || 'pending'
      });
    } else {
      setFormData({
        author: '',
        rating: 5,
        comment: '',
        status: 'pending'
      });
    }
  }, [review]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSave(formData);
      // Le parent gère la fermeture
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setLoading(false); // Arrêter le loading en cas d'erreur
    }
  };

  const handleRatingChange = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {review ? 'Modifier l\'avis' : 'Nouvel avis'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            aria-label="Fermer la modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                Nom du client
              </label>
              <input
                id="author"
                type="text"
                required
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Note
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className={`p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  aria-label={`Noter ${star} étoile${star > 1 ? 's' : ''}`}
                >
                  <Star className="w-6 h-6 fill-current" />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {formData.rating} étoile{formData.rating > 1 ? 's' : ''}
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Commentaire
            </label>
            <textarea
              id="comment"
              required
              rows={4}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Partagez votre expérience..."
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Statut
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'pending' | 'approved' | 'rejected' })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="pending">En attente</option>
              <option value="approved">Approuvé</option>
              <option value="rejected">Rejeté</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Sauvegarde...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
