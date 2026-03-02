import { Injectable, signal, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export type UserRole = 'admin' | 'shop' | 'buyer' | null;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly userRoleSignal = signal<UserRole>(this.getRoleFromStorage() || null);
  private readonly tokenSignal = signal<string | null>(this.getTokenFromStorage() || null);
  private readonly userSignal = signal<any>(null); 

  // point the service at the backend API; change if port differs
  private readonly backendUrl: string;
  
  userRole$ = this.userRoleSignal.asReadonly();
  user$ = this.userSignal.asReadonly();
  token$ = this.tokenSignal.asReadonly();

  constructor(private http: HttpClient, @Inject('API_URL') apiUrl: string) {
    this.backendUrl = `${apiUrl}/auth`;
  }

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
   * Récupérer le token depuis le localStorage
   */
  private getTokenFromStorage(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    return localStorage.getItem('authToken');
  }

  /**
   * Vérifier si l'utilisateur a un rôle spécifique
   */
  hasRole(role: UserRole): boolean {
    return this.userRoleSignal() === role;
  }

  /**
   * Envoyer les informations de connexion (email & mot de passe) au backend
   * et stocker le rôle + token renvoyés.
   * Si la réponse ne contient pas de token/user, rejette l'appel.
   */
  async login(credentials: { email: string; password: string }): Promise<void> {
    try {
      const response: any = await firstValueFrom(
        this.http.post(`${this.backendUrl}/login`, credentials)
      );

      // validation basique de la réponse
      if (!response || !response.token || !response.user) {
        throw new Error('Identifiants invalides');
      }

      const role: UserRole = response.user.role || null;
      const token: string = response.token;
      const user: any = response.user;

      this.userRoleSignal.set(role);
      this.tokenSignal.set(token);
      this.userSignal.set(user);

      // sauvegarder localement
      if (role) {
        localStorage.setItem('userRole', role);
      }
      if (token) {
        localStorage.setItem('authToken', token);
      }
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    } catch (error) {
      console.error('Erreur d\'authentification :', error);
      throw error;
    }
  }

  /**
   * Effectuer l'inscription auprès du backend
   */
  async register(data: { name: string; email: string; password: string; role?: UserRole }): Promise<any> {
    // role sera buyer par défaut si non fourni
    const payload = { ...data, role: data.role || 'buyer' };
    return firstValueFrom(this.http.post(`${this.backendUrl}/register`, payload));
  }

  /**
   * Vérifier si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    return this.userRoleSignal() !== null && this.tokenSignal() !== null;
  }

  /**
   * Déconnexion
   */
  async logout(): Promise<void> {
    try {
      await firstValueFrom(this.http.post(`${this.backendUrl}/logout`, {}));
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    } finally {
      this.userRoleSignal.set(null);
      this.tokenSignal.set(null);
      localStorage.removeItem('userRole');
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }
}
