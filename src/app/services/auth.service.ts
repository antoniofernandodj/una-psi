import { Injectable } from "@angular/core";
import { StorageService } from "../services/storage.service";

type User = {
  email: string;
  password: string;
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private storageService: StorageService) {}

  async login(email: string, password: string): Promise<boolean> {
    const user = await this.storageService.getItem("user");
    if (user && user.email === email && user.password === password) {
      return true;
    }
    return false;
  }

  logout(): void {
    this.storageService.removeItem("user");
  }

  signin(email: string, password: string): void {
    const user: User = { email, password };
    this.storageService.setItem("user", user);
  }
}
