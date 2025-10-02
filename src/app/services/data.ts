import { Injectable } from '@angular/core';


import {
  Firestore,
  collection,
  doc,
  collectionData,
  docData,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';


export interface Pet {
  id?: string;
  name: string;
  especie: string;
  race: string;
  age: number;
  obs: string;
  createdAt?: number;
}

export interface Cuidador {
  id?: string;
  name: string;
  phone: string;
  experience: number;
  especialty: string;
  createdAt?: number;
}

@Injectable({
  providedIn: 'root'
})
export class Data {
  constructor(private firestore: Firestore) {
  }


  getPets(): Observable<Pet[]> {
    const petsColletionRef = collection(this.firestore, 'pets');
    const q = query(petsColletionRef, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Pet[]>;
  }

  getPet(id: string): Observable<Pet | undefined> {
    const petDocRef = doc(this.firestore, `pets/${id}`);
    return docData(petDocRef, { idField: 'id' }) as Observable<Pet | undefined>;
  }


  adicionarPet(pet: Pet) {
    const petsCollectionRef = collection(this.firestore, 'pets');
    return addDoc(petsCollectionRef, { ...pet, createdAt: Date.now() })
  }

  updatePet(pet: Pet) {
    const petDocRef = doc(this.firestore, `pets/${pet.id}`);
    return updateDoc(petDocRef, { name: pet.name, especie: pet.especie, race: pet.race, age: pet.age, obs: pet.obs });
  }

  deletarPet(id: string) {
    const petDocRef = doc(this.firestore, `pets/${id}`);
    return deleteDoc(petDocRef);
  }

  getCuidadores(): Observable<Cuidador[]> {
    const cuidadoresColletionRef = collection(this.firestore, 'cuidadores');
    const q = query(cuidadoresColletionRef, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Cuidador[]>;
  }

  getCuidador(id: string): Observable<Cuidador | undefined> {
    const cuidadorDocRef = doc(this.firestore, `cuidadores/${id}`);
    return docData(cuidadorDocRef, { idField: 'id' }) as Observable<Cuidador | undefined>;
  }


  adicionarCuidador(cuidador: Cuidador) {
    const cuidadoresCollectionRef = collection(this.firestore, 'cuidadores');
    return addDoc(cuidadoresCollectionRef, { ...cuidador, createdAt: Date.now() })
  }

  updateCuidador(cuidador: Cuidador) {
    const cuidadorDocRef = doc(this.firestore, `cuidadores/${cuidador.id}`);
    return updateDoc(cuidadorDocRef, { name: cuidador.name, phone: cuidador.phone, experience: cuidador.experience, especialty: cuidador.especialty });
  }

  deletarCuidador(id: string) {
    const cuidadorDocRef = doc(this.firestore, `cuidadores/${id}`);
    return deleteDoc(cuidadorDocRef);
  }
}
