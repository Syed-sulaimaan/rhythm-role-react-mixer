
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Song, FilterOptions } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { mockSongs } from '@/data/mockSongs';
import MusicFilters from './MusicFilters';
import SongCard from './SongCard';
import AddSongModal from './AddSongModal';
import { Plus, LogOut, Music } from 'lucide-react';

const MusicLibrary: React.FC = () => {
  const { user, logout } = useAuth();
  const [songs, setSongs] = useState<Song[]>(mockSongs);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    artist: '',
    album: '',
    genre: '',
    sortBy: 'title',
    sortOrder: 'asc'
  });

  // Filter and sort songs using JavaScript built-in methods
  const filteredAndSortedSongs = useMemo(() => {
    return songs
      .filter(song => {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = !filters.search || 
          song.title.toLowerCase().includes(searchLower) ||
          song.artist.toLowerCase().includes(searchLower) ||
          song.album.toLowerCase().includes(searchLower);
        
        const matchesArtist = !filters.artist || song.artist === filters.artist;
        const matchesAlbum = !filters.album || song.album === filters.album;
        const matchesGenre = !filters.genre || song.genre === filters.genre;
        
        return matchesSearch && matchesArtist && matchesAlbum && matchesGenre;
      })
      .sort((a, b) => {
        const getValue = (song: Song) => {
          switch (filters.sortBy) {
            case 'year': return song.year;
            case 'artist': return song.artist.toLowerCase();
            case 'album': return song.album.toLowerCase();
            default: return song.title.toLowerCase();
          }
        };
        
        const aValue = getValue(a);
        const bValue = getValue(b);
        
        if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [songs, filters]);

  // Group songs by category for stats
  const songStats = useMemo(() => {
    const artistCount = songs.reduce((acc, song) => {
      acc[song.artist] = (acc[song.artist] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const genreCount = songs.reduce((acc, song) => {
      acc[song.genre] = (acc[song.genre] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalSongs: songs.length,
      totalArtists: Object.keys(artistCount).length,
      totalGenres: Object.keys(genreCount).length,
      mostPopularArtist: Object.entries(artistCount).reduce((a, b) => a[1] > b[1] ? a : b)?.[0] || 'N/A'
    };
  }, [songs]);

  const handleAddSong = (newSong: Omit<Song, 'id'>) => {
    const song: Song = {
      ...newSong,
      id: Date.now().toString()
    };
    setSongs(prev => [...prev, song]);
  };

  const handleDeleteSong = (id: string) => {
    setSongs(prev => prev.filter(song => song.id !== id));
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full music-gradient flex items-center justify-center">
              <Music size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                MusicHub Library
              </h1>
              <p className="text-muted-foreground">
                Welcome back, {user?.username} ({user?.role})
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="music-gradient"
              >
                <Plus size={16} className="mr-2" />
                Add Song
              </Button>
            )}
            <Button variant="outline" onClick={logout}>
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="glass-effect p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-400">{songStats.totalSongs}</div>
            <div className="text-sm text-muted-foreground">Total Songs</div>
          </div>
          <div className="glass-effect p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-400">{songStats.totalArtists}</div>
            <div className="text-sm text-muted-foreground">Artists</div>
          </div>
          <div className="glass-effect p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-400">{songStats.totalGenres}</div>
            <div className="text-sm text-muted-foreground">Genres</div>
          </div>
          <div className="glass-effect p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-400">{filteredAndSortedSongs.length}</div>
            <div className="text-sm text-muted-foreground">Filtered Results</div>
          </div>
        </div>

        {/* Filters */}
        <MusicFilters 
          filters={filters}
          onFiltersChange={setFilters}
          songs={songs}
        />

        {/* Song Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedSongs.map(song => (
            <SongCard
              key={song.id}
              song={song}
              onDelete={isAdmin ? handleDeleteSong : undefined}
              canDelete={isAdmin}
            />
          ))}
        </div>

        {filteredAndSortedSongs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Music size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No songs found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or {isAdmin ? 'add some new songs' : 'check back later'}
            </p>
          </div>
        )}

        {/* Add Song Modal */}
        <AddSongModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddSong}
        />
      </div>
    </div>
  );
};

export default MusicLibrary;
