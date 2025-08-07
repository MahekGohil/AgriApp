import { create } from 'zustand';

type UserRole = 'farmer' | 'veterinarian' | 'agronomist';

interface AuthState {
  role: UserRole | null;
  setRole: (role: UserRole) => void;
  clearRole: () => void; // 👈 ADD THIS
}

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
  clearRole: () => set({ role: null }), // 👈 AND THIS
}));
