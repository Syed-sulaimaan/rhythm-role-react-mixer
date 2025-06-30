
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { FilterOptions, Song } from '@/types';
import { Filter } from 'lucide-react';

interface MusicFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  songs: Song[];
}

const MusicFilters: React.FC<MusicFiltersProps> = ({ filters, onFiltersChange, songs }) => {
  // Get unique values for filter dropdowns using reduce
  const uniqueArtists = songs.reduce((acc: string[], song) => {
    if (!acc.includes(song.artist)) {
      acc.push(song.artist);
    }
    return acc;
  }, []).sort();

  const uniqueAlbums = songs.reduce((acc: string[], song) => {
    if (!acc.includes(song.album)) {
      acc.push(song.album);
    }
    return acc;
  }, []).sort();

  const uniqueGenres = songs.reduce((acc: string[], song) => {
    if (!acc.includes(song.genre)) {
      acc.push(song.genre);
    }
    return acc;
  }, []).sort();

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      artist: '',
      album: '',
      genre: '',
      sortBy: 'title',
      sortOrder: 'asc'
    });
  };

  return (
    <div className="space-y-4 p-6 glass-effect rounded-lg mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={20} className="text-purple-400" />
        <h3 className="text-lg font-semibold">Filters & Search</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Input
            placeholder="Search songs..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full"
          />
        </div>

        <Select value={filters.artist} onValueChange={(value) => handleFilterChange('artist', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Artist" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Artists</SelectItem>
            {uniqueArtists.map(artist => (
              <SelectItem key={artist} value={artist}>{artist}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.album} onValueChange={(value) => handleFilterChange('album', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Album" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Albums</SelectItem>
            {uniqueAlbums.map(album => (
              <SelectItem key={album} value={album}>{album}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.genre} onValueChange={(value) => handleFilterChange('genre', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Genres</SelectItem>
            {uniqueGenres.map(genre => (
              <SelectItem key={genre} value={genre}>{genre}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Sort by:</span>
          <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value as FilterOptions['sortBy'])}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="artist">Artist</SelectItem>
              <SelectItem value="album">Album</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Order:</span>
          <Select value={filters.sortOrder} onValueChange={(value) => handleFilterChange('sortOrder', value as FilterOptions['sortOrder'])}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" onClick={clearFilters} size="sm">
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default MusicFilters;
