import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, collection, CollectionReference, deleteDoc, doc, getDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);

export class Firebase{

    private table:CollectionReference
    private tableName:string

    constructor(table:string){
        this.table = collection(db, table)
        this.tableName = table
    }

    // Busca todos os dados da coleÃ§Ã£o
    public async getDatas(){
        return (await getDocs(this.table)).docs.map(doc => doc.data())
    }

    // Adiciona dados a coleÃ§Ã£o (retorna o id do dado para uma futura busca, Ã© um hash)
    public async addData(data:any){
        return (await addDoc(this.table, data)).id
    }

    // Busca por id e retorna oque foi salvo, caso nÃ£o exista retorna undefined
    public async getData(id:string){
        return (await getDoc(doc(db, this.tableName, id))).data()
    }

    // Atualiza o dado que foi passado
    public async updateData(id:string, data:any){
        await updateDoc(doc(db, this.tableName, id), data)
    }

    // Deleta o dado que foi passado
    public async deleteData(id:string){
        await deleteDoc(doc(db, this.tableName, id))
    }
}