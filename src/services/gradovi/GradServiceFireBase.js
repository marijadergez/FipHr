import { collection, doc, updateDoc, getDoc, getDocs, addDoc, deleteDoc, Timestamp } from "firebase/firestore";
import getFirebaseDB from "../Firebase";
import { PrefixStorage } from "../../constants";
import { gradovi } from "./GradPodaci";

// 1/4 Read - dohvati sve
async function get() {
    try {
        const skupGrad = collection(getFirebaseDB(), PrefixStorage.GRADOVI);
        const snapshot = await getDocs(skupGrad);
        
        const data = snapshot.docs.map(doc => {
            const podaci = doc.data();
            // Ako grupa ima datumPočetka, pretvaramo ga u ISO string za frontend
            const d = podaci.datumPocetka ? podaci.datumPocetka.toDate() : new Date();
            
            return {
                sifra: doc.id,
                ...podaci,
                datumPocetka: d.toISOString()
            };
        });
        
        return { success: true, data: data };
    } catch (e) {
        console.error("Greška kod dohvaćanja gradova: ", e);
        return { success: false, message: e.message };
    }
}

// Dohvati jednu po šifri
async function getBySifra(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.GRADOVI, sifra);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const podaci = docSnap.data();
            const d = podaci.datumPocetka ? podaci.datumPocetka.toDate() : new Date();
            
            return {
                success: true,
                data: {
                    sifra: docSnap.id,
                    ...podaci,
                    datumPocetka: d.toISOString()
                }
            };
        } else {
            return { success: false, message: "Grad s tom šifrom ne postoji." };
        }
    } catch (e) {
        return { success: false, message: e.message };
    }
}

// 2/4 Create - dodaj novu
async function dodaj(grupa) {
    try {
        // Pretvorba datuma u Firebase Timestamp prije spremanja
        if (gradovi.datumPocetka) {
            gradovi.datumPocetka = Timestamp.fromDate(new Date(gradovi.datumPocetka));
        }

        const skupGrad = collection(getFirebaseDB(), PrefixStorage.GRADOVI);
        const docRef = await addDoc(skupGrad, grad);
        
        return {
            success: true,
            id: docRef.id // vraćamo id nove grupe
        };
    } catch (e) {
        console.error("Greška kod dodavanja grada: ", e);
        return { success: false, message: e.message };
    }
}

// 3/4 Update - promjeni postojeću
async function promjeni(sifra, grad) {
    try {
        // Pretvorba datuma u Firebase Timestamp prije ažuriranja
        if (gradovi.datumPocetka) {
            gradovi.datumPocetka = Timestamp.fromDate(new Date(gradovi.datumPocetka));
        }

        const docRef = doc(getFirebaseDB(), PrefixStorage.GRADOVI, sifra);
        await updateDoc(docRef, grad);

        return { success: true };
    } catch (e) {
        console.error("Greška kod promjene grada: ", e);
        return { success: false, message: e.message };
    }
}

// 4/4 Delete - obriši
async function obrisi(sifra) {
    try {
        const docRef = doc(getFirebaseDB(), PrefixStorage.GRADOVI, sifra);
        await deleteDoc(docRef);
        return {
            success: true,
            message: "Uspješno obrisano"
        };
    } catch (e) {
        console.error("Greška kod brisanja grada: ", e);
        return { success: false, message: e.message };
    }
}

export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
};