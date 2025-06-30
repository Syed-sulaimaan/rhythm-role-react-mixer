
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { FilterOptions, Song } from '@/types';
import { Search, RotateCcw } from 'lucide-react';

interface MusicFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  songs: Song[];
}

const MusicFilters: React.FC<MusicFiltersProps> = ({ filters, onFiltersChange, songs }) => {
  // Get unique values for filter options
  const uniqueArtists = [...new Set(songs.map(song => song.artist))].sort();
  const uniqueAlbums = [...new Set(songs.map(song => song.album))].sort();
  const uniqueGenres = [...new Set(songs.map(song => song.genre))].sort();

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const resetFilters = () => {
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
    <div className="glass-effect p-6 rounded-lg mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search songs, artists, albums..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Artist Filter */}
        <div>
          <Select value={filters.artist} onValueChange={(value) => handleFilterChange('artist', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Artist" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Artists</SelectItem>
              {uniqueArtists.map(artist => (
                <SelectItem key={artist} value={artist}>{artist}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Album Filter */}
        <div>
          <Select value={filters.album} onValueChange={(value) => handleFilterChange('album', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Album" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Albums</SelectItem>
              {uniqueAlbums.map(album => (
                <SelectItem key={album} value={album}>{album}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Genre Filter */}
        <div>
          <Select value={filters.genre} onValueChange={(value) => handleFilterChange('genre', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {uniqueGenres.map(genre => (
                <SelectItem key={genre} value={genre}>{genre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div>
          <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value as FilterOptions['sortBy'])}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="artist">Artist</SelectItem>
              <SelectItem value="album">Album</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort Order */}
        <div>
          <Select value={filters.sortOrder} onValueChange={(value) => handleFilterChange('sortOrder', value as FilterOptions['sortOrder'])}>
            <SelectTrigger>
              <SelectValue placeholder="Sort order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" onClick={resetFilters} size="sm">
          <RotateCcw size={16} className="mr-2" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default MusicFilters;
