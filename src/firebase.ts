import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, collection, CollectionReference, deleteDoc, doc, getDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCw95PQgz-4S6irVCG9LHmRSnAI0_Y4Me0",
  authDomain: "projetodispositivosmovei-4e27e.firebaseapp.com",
  projectId: "projetodispositivosmovei-4e27e",
  storageBucket: "projetodispositivosmovei-4e27e.firebasestorage.app",
  messagingSenderId: "138336816791",
  appId: "1:138336816791:web:1ce020ddd8febdffa023d2",
  measurementId: "G-YD81RW5CH8"
};

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

/*
Exemplo de uso (sim esse exemplo funciona)
var firebase = new Firebase('usuario')
firebase.getDatas()
*/

/*OBS:
1. Recomendo salvar os dados no formato de JSON, Ã© melhor para utilizar
2. Ao adicionar um dado a tabela, caso a tabela nÃ£o exista ele cria automaticamente
3. Adicionei vocÃª no projeto do Firebase como proprietÃ¡rio, lÃ¡ da para alterar tudo
4. https://console.firebase.google.com/project/ddmfirebase-96956/overview?hl=pt-br (Com esse link da para acessar o banco pelo navegador)
5. npm i firebase (Caso nÃ£o saiba instalar ðŸ¤¡)
*/
