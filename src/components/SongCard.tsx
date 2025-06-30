
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Song } from '@/types';
import { Music, Trash2 } from 'lucide-react';

interface SongCardProps {
  song: Song;
  onDelete?: (id: string) => void;
  canDelete: boolean;
}

const SongCard: React.FC<SongCardProps> = ({ song, onDelete, canDelete }) => {
  return (
    <Card className="group hover:scale-105 transition-all duration-200 glass-effect hover:shadow-lg hover:shadow-purple-500/20">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg music-gradient flex items-center justify-center flex-shrink-0">
                <Music size={20} className="text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground truncate">{song.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
              </div>
            </div>
            
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Album:</span>
                <span className="text-foreground truncate ml-2">{song.album}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Genre:</span>
                <span className="text-foreground">{song.genre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Year:</span>
                <span className="text-foreground">{song.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="text-foreground">{song.duration}</span>
              </div>
            </div>
          </div>
          
          {canDelete && onDelete && (
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive ml-2"
              onClick={() => onDelete(song.id)}
            >
              <Trash2 size={16} />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SongCard;
