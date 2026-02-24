import { Injectable, signal } from '@angular/core';

export type UserRole = 'admin' | 'magasin' | 'client' | null;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly userRoleSignal = signal<UserRole>(this.getRoleFromStorage() || null);
  
  userRole$ = this.userRoleSignal.asReadonly();

  constructor() {}

  /**
   * Définir le rôle de l'utilisateur
   */
  setUserRole(role: UserRole): void {
    this.userRoleSignal.set(role);
    if (typeof window !== 'undefined') {
      if (role) {
        localStorage.setItem('userRole', role);
      } else {
        localStorage.removeItem('userRole');
      }
    }
  }

  /**
   * Obtenir le rôle actuel de l'utilisateur
   */
  getUserRole(): UserRole {
    return this.userRoleSignal();
  }

  /**
   * Récupérer le rôle depuis le localStorage
   */
  private getRoleFromStorage(): UserRole {
    if (typeof window === 'undefined') {
      return null;
    }
    const stored = localStorage.getItem('userRole');
    return (stored as UserRole) || null;
  }

  /**
   * Vérifier si l'utilisateur a un rôle spécifique
   */
  hasRole(role: UserRole): boolean {
    return this.userRoleSignal() === role;
  }

  /**
   * Vérifier si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    return this.userRoleSignal() !== null;
  }

  /**
   * Déconnexion
   */
  logout(): void {
    this.userRoleSignal.set(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userRole');
    }
  }
}
