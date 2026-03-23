import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  ArrowLeft, Play, Trophy, Star, Clock, Users, Gamepad2,
  Brain, Zap, Target, Award, BookOpen, Sparkles, Heart
} from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const GamifiedLearning = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    filterGames();
  }, [games, selectedAgeGroup]);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/games`);
      
      if (response.data.success) {
        setGames(response.data.data.games);
      } else {
        // Mock data for demo
        setGames([
          {
            id: 'game1',
            title: 'Legend of the Thunder Dragon',
            type: 'interactive_story',
            age_group: 'teens',
            description: 'Interactive animated story about Sikkim\'s founding and the legend of Kanchenjunga',
            content_url: '#',
            thumbnail_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
            difficulty_level: 'medium',
            historical_period: '17th Century',
            cultural_theme: 'Sikkim Founding Story',
            play_count: 1247,
            average_rating: 4.8
          },
          {
            id: 'game2',
            title: 'Monastery Builder Quest',
            type: 'virtual_reality',
            age_group: 'children',
            description: 'Build and manage your own Buddhist monastery while learning about architecture and traditions',
            content_url: '#',
            thumbnail_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
            difficulty_level: 'easy',
            historical_period: 'Ancient Times',
            cultural_theme: 'Buddhist Architecture',
            play_count: 2156,
            average_rating: 4.9
          },
          {
            id: 'game3',
            title: 'Lepcha Heritage Quiz Challenge',
            type: 'quiz',
            age_group: 'adults',
            description: 'Test your knowledge about Lepcha culture, traditions, and their connection with nature',
            content_url: '#',
            thumbnail_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
            difficulty_level: 'hard',
            historical_period: 'Traditional Era',
            cultural_theme: 'Indigenous Culture',
            play_count: 867,
            average_rating: 4.6
          },
          {
            id: 'game4',
            title: 'Festival Timeline Adventure',
            type: 'interactive_game',
            age_group: 'all',
            description: 'Journey through Sikkim\'s festivals across the year and learn their significance',
            content_url: '#',
            thumbnail_url: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop',
            difficulty_level: 'medium',
            historical_period: 'Modern Times',
            cultural_theme: 'Festivals & Celebrations',
            play_count: 1834,
            average_rating: 4.7
          }
        ]);
      }
    } catch (err) {
      console.error('Error fetching games:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterGames = () => {
    if (selectedAgeGroup === 'all') {
      setFilteredGames(games);
    } else {
      setFilteredGames(games.filter(game => game.age_group === selectedAgeGroup || game.age_group === 'all'));
    }
  };

  const getGameIcon = (type) => {
    switch (type) {
      case 'quiz': return Brain;
      case 'interactive_story': return BookOpen;
      case 'interactive_game': return Gamepad2;
      case 'virtual_reality': return Sparkles;
      default: return Play;
    }
  };

  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getAgeGroupColor = (group) => {
    switch (group) {
      case 'children': return 'bg-pink-100 text-pink-700';
      case 'teens': return 'bg-purple-100 text-purple-700';
      case 'adults': return 'bg-blue-100 text-blue-700';
      case 'all': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <p className="text-slate-600">Loading interactive experiences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-indigo-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="hover:bg-indigo-50 text-slate-700 rounded-full"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Home
            </Button>
          </div>

          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl font-bold text-slate-900">
              Interactive Learning &
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Cultural Games
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Discover Sikkim's rich history and culture through engaging games, interactive stories, and immersive experiences designed for all ages.
            </p>
          </div>

          {/* Age Group Filter */}
          <div className="flex justify-center">
            <div className="flex space-x-2 bg-slate-100 p-1 rounded-full">
              {['all', 'children', 'teens', 'adults'].map((group) => (
                <button
                  key={group}
                  onClick={() => setSelectedAgeGroup(group)}
                  className={`px-4 py-2 rounded-full transition-all duration-200 capitalize ${
                    selectedAgeGroup === group 
                      ? 'bg-white shadow-sm text-indigo-600 font-semibold' 
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  {group === 'all' ? 'All Ages' : group}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredGames.map((game) => {
            const GameIcon = getGameIcon(game.type);
            
            return (
              <Card key={game.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white border border-indigo-100 rounded-3xl overflow-hidden">
                {/* Thumbnail */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={['/hero-image.png', '/monastery_1.png', '/monastery_2.png', '/monastery_3.png'][game.title.length % 4]} 
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/70 transition-all duration-300"></div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-slate-700 border-0 capitalize">
                      <GameIcon className="w-3 h-3 mr-1" />
                      {game.type.replace('_', ' ')}
                    </Badge>
                  </div>

                  {/* Age Group Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className={`${getAgeGroupColor(game.age_group)} border-0 capitalize`}>
                      {game.age_group}
                    </Badge>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm p-6 rounded-full border border-white/30 transform group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold mb-1 group-hover:scale-105 transition-transform duration-200">
                      {game.title}
                    </h3>
                    <p className="text-sm opacity-90">{game.cultural_theme}</p>
                  </div>
                </div>

                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Rating and Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-semibold text-slate-800">{game.average_rating}</span>
                        </div>
                        <span className="text-slate-500 text-sm">•</span>
                        <div className="flex items-center space-x-1 text-slate-600 text-sm">
                          <Users className="w-4 h-4" />
                          <span>{game.play_count.toLocaleString()} plays</span>
                        </div>
                      </div>
                      
                      <Badge className={`${getDifficultyColor(game.difficulty_level)} border-0 font-semibold`}>
                        {game.difficulty_level}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-slate-700 leading-relaxed">
                      {game.description}
                    </p>

                    {/* Game Details */}
                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-2xl border border-indigo-100">
                        <div className="flex items-start space-x-3">
                          <Clock className="w-5 h-5 text-indigo-600 mt-0.5" />
                          <div>
                            <h5 className="font-semibold text-slate-800">Historical Period</h5>
                            <p className="text-slate-600 text-sm">{game.historical_period}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl transition-all duration-200 transform hover:scale-105">
                        <Play className="mr-2 w-5 h-5" />
                        Play Now
                      </Button>
                      <Button 
                        variant="outline" 
                        className="px-4 border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 text-indigo-700 rounded-xl"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Achievement Preview */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-2xl border border-yellow-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                          <Trophy className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-slate-800 text-sm">Earn Achievements</h5>
                          <p className="text-slate-600 text-xs">Complete levels to unlock cultural insights and rewards</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Learning Objectives Section */}
        <div className="mt-16 bg-white p-12 rounded-3xl border border-indigo-100 shadow-lg">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto">
              <Target className="w-8 h-8 text-white" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Learning Through Play
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Our gamified approach makes learning about Sikkim's culture engaging and memorable. Each game is carefully designed to preserve and transmit cultural knowledge to younger generations.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Cultural Knowledge</h3>
                <p className="text-slate-600 text-sm">Learn traditions, history, and customs through interactive storytelling</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Engaging Experience</h3>
                <p className="text-slate-600 text-sm">Interactive games that make learning fun and memorable</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Achievement System</h3>
                <p className="text-slate-600 text-sm">Earn badges and rewards as you progress through cultural lessons</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};