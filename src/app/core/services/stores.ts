import { Injectable } from "@angular/core";
import { Approach, ContactRequest, PsychologistProfile, Specialty, User } from "../models";
import { CollectionStore } from "./collection-store";
import { StorageService } from "./storage.service";

@Injectable({ providedIn: "root" })
export class UsersStore extends CollectionStore<User> {
  constructor(s: StorageService) { super(s, "unapsi.users"); }
}

@Injectable({ providedIn: "root" })
export class ProfilesStore extends CollectionStore<PsychologistProfile> {
  constructor(s: StorageService) { super(s, "unapsi.profiles"); }
}

@Injectable({ providedIn: "root" })
export class ApproachesStore extends CollectionStore<Approach> {
  constructor(s: StorageService) { super(s, "unapsi.approaches"); }
}

@Injectable({ providedIn: "root" })
export class SpecialtiesStore extends CollectionStore<Specialty> {
  constructor(s: StorageService) { super(s, "unapsi.specialties"); }
}

@Injectable({ providedIn: "root" })
export class RequestsStore extends CollectionStore<ContactRequest> {
  constructor(s: StorageService) { super(s, "unapsi.requests"); }
}
