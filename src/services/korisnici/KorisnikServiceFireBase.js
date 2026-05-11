import { collection, doc, updateDoc, getDoc, getDocs, addDoc, deleteDoc, query, orderBy, limit, startAfter, where } from "firebase/firestore";
import getFirebaseDB from "../Firebase";
import { PrefixStorage } from "../../constants";

// 1/4 Read - dohvati sve
async function get() {
    try {
        const skupKorisnika = collection(getFirebaseDB(), PrefixStorage.KORISNICI);
        const snapshot = await getDocs(skupKorisnika);
        const data = snapshot.docs.map(doc => ({
            sifra: doc.id,
            ...doc.data()
        }));
        return { success: true, data: data };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

// Dohvati jedan po šifri
async function getBySifra(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.KORISNICI, sifra);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { success: true, data: { sifra: docSnap.id, ...docSnap.data() } };
        }
        return { success: false, message: "Korisnik nije pronađen" };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

// 2/4 Create - dodaj novi
async function dodaj(korisnik) {
    try {
        const skupKorisnika = collection(getFirebaseDB(), PrefixStorage.KORISNICI);
        const docRef = await addDoc(skupKorisnika,korisnik);
        return { success: true, data: { sifra: docRef.id, ...korisnik } };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

// 3/4 Update - promjeni postojeći
async function promjeni(sifra, korisnik) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.KORISNICI, sifra);
        await updateDoc(docRef, korisnik);
        return { success: true, data: { sifra, ...korisnik } };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

// 4/4 Delete - obriši
async function obrisi(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.KORISNICI, sifra);
        await deleteDoc(docRef);
        return { success: true, message: 'Uspješno obrisano' };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

/**
 * Straničenje - dohvati stranicu polaznika
 * NAPOMENA: Firestore ne podržava "offset" na način kao SQL ili JS slice.
 * Za pravo serversko straničenje (startAfter) potreban je zadnji dokument prethodne stranice.
 * Ovdje koristimo pojednostavljenu verziju koja dohvaća podatke i filtrira ih.
 */
async function getPage(page = 1, pageSize = 8, searchTerm = '') {
    try {
        const skupKorisnika = collection(getFirebaseDB(), PrefixStorage.KORISNICI);
        let q = query(skupKorisnika, orderBy("prezime"));

        const snapshot = await getDocs(q);
        let korisnici = snapshot.docs.map(doc => ({
            sifra: doc.id,
            ...doc.data()
        }));

        // Filtriranje (budući da Firestore ne podržava kompleksni "OR" search na više polja s "includes")
        if (searchTerm && searchTerm.trim() !== '') {
            const lowerSearchTerm = searchTerm.toLowerCase().trim();
            korisnici = korisnici.filter(p => 
                (p.ime || '').toLowerCase().includes(lowerSearchTerm) ||
                (p.prezime || '').toLowerCase().includes(lowerSearchTerm) ||
                (p.email || '').toLowerCase().includes(lowerSearchTerm) ||
            '')
              
        };

        const totalItems = korisnici.length;
        const totalPages = Math.ceil(totalItems / pageSize);
        const startIndex = (page - 1) * pageSize;
        const paginatedData = ko.slice(startIndex, startIndex + pageSize);

        return {
            success: true,
            data: paginatedData,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            totalItems: totalItems
        };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi,
    getPage
};