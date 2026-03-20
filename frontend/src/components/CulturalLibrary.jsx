import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  ArrowLeft, Play, BookOpen, Image as ImageIcon, Volume2, 
  Eye, Heart, Clock, Download, Share2, Filter, Search
} from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const CulturalLibrary = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchCulturalContent();
  }, []);

  useEffect(() => {
    filterContent();
  }, [content, searchTerm, filterCategory, filterType]);

  const fetchCulturalContent = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/cultural-content`);
      
      if (response.data.success) {
        setContent(response.data.data.cultural_content);
      } else {
        setError('Failed to load cultural content');
      }
    } catch (err) {
      console.error('Error fetching cultural content:', err);
      setError('Failed to load cultural content');
    } finally {
      setLoading(false);
    }
  };

  const filterContent = () => {
    let filtered = content;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (filterCategory !== 'all') {
      filtered = filtered.filter(item => item.category === filterCategory);
    }

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(item => item.type === filterType);
    }

    setFilteredContent(filtered);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return Play;
      case 'article': return BookOpen;
      case 'gallery': return ImageIcon;
      case 'audio': return Volume2;
      default: return BookOpen;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'handicrafts': return 'bg-amber-100 text-amber-700';
      case 'sculptures': return 'bg-purple-100 text-purple-700';
      case 'healing_methods': return 'bg-green-100 text-green-700';
      case 'traditions': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const categories = ['all', 'handicrafts', 'sculptures', 'healing_methods', 'traditions'];
  const types = ['all', 'video', 'article', 'gallery', 'audio'];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <p className="text-slate-600">Loading cultural treasures...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="hover:bg-purple-50 text-slate-700 rounded-full"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Home
            </Button>
          </div>

          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl font-bold text-slate-900">
              Cultural Heritage
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Digital Library
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Explore Sikkim's rich cultural heritage through videos, articles, galleries, and audio content showcasing traditional arts, healing methods, and ancient wisdom.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search cultural content, crafts, or traditions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-slate-600" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-3 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchCulturalContent} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full">
              Try Again
            </Button>
          </div>
        )}

        {filteredContent.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No Content Found</h3>
            <p className="text-slate-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredContent.map((item) => {
            const TypeIcon = getTypeIcon(item.type);
            
            return (
              <Card key={item.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border border-purple-100 rounded-2xl overflow-hidden">
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.thumbnail_url || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-slate-700 border-0">
                      <TypeIcon className="w-3 h-3 mr-1" />
                      {item.type}
                    </Badge>
                  </div>

                  {/* Duration for videos */}
                  {item.duration_minutes && (
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {item.duration_minutes}m
                    </div>
                  )}

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/30">
                      <TypeIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge className={`${getCategoryColor(item.category)} border-0 text-xs`}>
                          {item.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                        <div className="flex items-center space-x-1 text-slate-500 text-xs">
                          <Eye className="w-3 h-3" />
                          <span>{item.views_count || 0}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors duration-200 line-clamp-2">
                        {item.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 3).map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                          #{tag}
                        </Badge>
                      ))}
                      {item.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                          +{item.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl mr-2">
                        <TypeIcon className="mr-2 w-4 h-4" />
                        {item.type === 'video' ? 'Watch' : item.type === 'audio' ? 'Listen' : 'Read'}
                      </Button>
                      
                      <div className="flex space-x-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-purple-200 hover:bg-purple-50 text-purple-700 p-2"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-purple-200 hover:bg-purple-50 text-purple-700 p-2"
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Load More */}
        {filteredContent.length > 0 && (
          <div className="text-center mt-12">
            <Button 
              variant="outline"
              className="border-2 border-purple-200 hover:border-purple-300 text-slate-700 hover:bg-purple-50 px-8 py-3 rounded-full text-lg font-semibold"
            >
              Load More Content
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};