import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface Toast {
  id: number;
  text: string;
  tone: "success" | "error";
}

@Injectable({ providedIn: "root" })
export class ToastService {
  private next = 0;
  readonly toasts$ = new BehaviorSubject<Toast[]>([]);

  success(text: string) { this.push(text, "success"); }
  error(text: string) { this.push(text, "error"); }

  private push(text: string, tone: Toast["tone"]) {
    const toast = { id: this.next++, text, tone };
    this.toasts$.next([...this.toasts$.value, toast]);
    setTimeout(() => this.toasts$.next(this.toasts$.value.filter((t) => t.id !== toast.id)), 3500);
  }
}
