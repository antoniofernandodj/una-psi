import { BehaviorSubject, Observable } from "rxjs";
import { Entity } from "../models";
import { StorageService } from "./storage.service";
import { uid } from "../utils/misc";

/** Coleção persistida com stream reativo. Base de todos os "repositórios". */
export abstract class CollectionStore<T extends Entity> {
  private subject: BehaviorSubject<T[]>;
  readonly items$: Observable<T[]>;

  protected constructor(
    protected storage: StorageService,
    private key: string,
  ) {
    this.subject = new BehaviorSubject<T[]>(storage.get<T[]>(key) ?? []);
    this.items$ = this.subject.asObservable();
  }

  get items(): T[] {
    return this.subject.value;
  }

  find(id: string | null | undefined): T | undefined {
    return this.items.find((i) => i.id === id);
  }

  /** Insere (gerando id, se ausente) ou substitui pelo id. */
  upsert(item: Omit<T, "id"> & { id?: string }): T {
    const saved = { ...item, id: item.id ?? uid() } as T;
    const exists = this.items.some((i) => i.id === saved.id);
    this.commit(exists ? this.items.map((i) => (i.id === saved.id ? saved : i)) : [...this.items, saved]);
    return saved;
  }

  remove(id: string): void {
    this.commit(this.items.filter((i) => i.id !== id));
  }

  removeWhere(predicate: (item: T) => boolean): void {
    this.commit(this.items.filter((i) => !predicate(i)));
  }

  protected commit(items: T[]): void {
    this.storage.set(this.key, items);
    this.subject.next(items);
  }
}
