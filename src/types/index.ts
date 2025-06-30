
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: string;
  year: number;
  imageUrl?: string;
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface FilterOptions {
  search: string;
  artist: string;
  album: string;
  genre: string;
  sortBy: 'title' | 'artist' | 'album' | 'year';
  sortOrder: 'asc' | 'desc';
}
