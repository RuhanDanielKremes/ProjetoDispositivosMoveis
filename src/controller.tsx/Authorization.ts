import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword  } from "firebase/auth";
import { auth } from "../firebase";

export class Authorization {

    public static async createAccount(name: string, email: string, password: string): Promise<boolean> {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Usuário criado:", userCredential.user.uid);
            const user = userCredential.user;
            await updateProfile(user, { displayName: name });
            console.log("Nome do usuário atualizado para:", name);
            return true;
        } catch (error: any) {
            alert("Erro ao criar conta: " + error.message);
            console.error("Erro ao criar usuário:", error.message);
            return false;
        }
    }

    public static async login(email: string, password: string): Promise<boolean> {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Usuário autenticado:", userCredential.user);
            localStorage.setItem('token', await userCredential.user.getIdToken());
            localStorage.setItem('username', await userCredential.user.email || '');
            return true;
        } catch (error: any) {
            alert("Erro ao fazer login: " + error.message);
            console.error("Erro ao fazer login:", error.message);
            return false;
        }
    }
}