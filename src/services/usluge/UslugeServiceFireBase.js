import { collection, doc, updateDoc,getDoc, getDocs, addDoc, deleteDoc, Timestamp } from "firebase/firestore";
import getFirebaseDB from "../Firebase";
import { PrefixStorage } from "../../constants";
import { usluge } from "./UslugePodaci";

async function get() {
    const skupUsluga = collection(getFirebaseDB(), PrefixStorage.USLUGE);
    const uslugeSnapshot = await getDocs(skupUsluga);
    return {success: true, data: uslugeSnapshot.docs.map(doc => {
        const data = doc.data();
        const d = data.datumPokretanja ? data.datumPokretanja.toDate() : new Date();
        const isoDatum = d.toISOString();
        return {
            sifra: doc.id,
            ...data,
            datumPokretanja: isoDatum 
        };
    }) }
}

async function dodaj(usluga) {
    const dateObj = new Date(usluge.datumPokretanja);
    const firestoreTimestamp = Timestamp.fromDate(dateObj);
    usluga.datumPokretanja = firestoreTimestamp;
    try {
        const skupUsluga = collection(getFirebaseDB(), PrefixStorage.USLUGE);
        const docRef = await addDoc(skupUsluga, usluge);
        
        return {
            success: true,
            id: docRef.id
        };
    } catch (e) {
        console.error("Greška kod dodavanja: ", e);
        return {
            success: false,
            message: e.message
        };
    }
}


async function getBySifra(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.USLUGE, sifra);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            const d = data.datumPokretanja ? data.datumPokretanja.toDate() : new Date();
            const isoDatum = d.toISOString();
          
            return {
                success: true,
                data: {
                    sifra: docSnap.id,
                    ...data,
                    datumPokretanja: isoDatum
                }
            };
        } else {
            return { 
                success: false, 
                message: "Smjer s tom šifrom ne postoji u bazi." 
            };
        }
    } catch (e) {
        console.error("Greška kod dohvaćanja po šifri: ", e);
        return { 
            success: false, 
            message: e.message 
        };
    }
}


async function promjeni(sifra, usluga) {
    try {
        const dateObj = new Date(usluga.datumPokretanja);
        const firestoreTimestamp = Timestamp.fromDate(dateObj);
        usluge.datumPokretanja = firestoreTimestamp;
        const docRef = doc(getFirebaseDB(), PrefixStorage.USLUGE, sifra);
        await updateDoc(docRef, usluge);

        return { success: true };
    } catch (e) {
        console.error("Greška kod promjene: ", e);
        return { success: false, message: e.message };
    }
}


async function obrisi(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.USLUGE, sifra);
        await deleteDoc(docRef);
        return {
            success: true,
            message: "Uspješno obrisano"
        };
    } catch (e) {
        console.error("Greška kod brisanja: ", e);
        return {
            success: false,
            message: e.message
        };
    }
}

export default {
    get,
    dodaj,
    promjeni,
    getBySifra,
    obrisi
}
