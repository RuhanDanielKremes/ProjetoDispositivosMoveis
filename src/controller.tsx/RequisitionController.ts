import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Requisition } from "../models/Requisitions";
import { UserController } from "./UserController";
import { ImageController } from "./ImageController";

export class RequisitionController {

    constructor() { }

    public static async createRequisition(requisition: Requisition) {
        const userId = await UserController.getUserId();
        if (!userId) {
            throw new Error("User ID is required to create a requisition.");
        }
        if (!requisition.getTitle() || !requisition.getDescription() || !requisition.getDate()) {
            throw new Error("Missing required requisition fields.");
        }
        const docRef = await addDoc(collection(db, "requisitions"), {
            title: requisition.getTitle(),
            description: requisition.getDescription(),
            date: requisition.getDate(),
            latitude: requisition.getLatitude(),
            longitude: requisition.getLongitude(),
            userId: userId,
            photoUrl: requisition.getPhotoUrl() || '',
            comments: requisition.comments || []
        });
        return docRef.id;
    }
    
    public static async updatePhotoUrl(requisitionId: string, photoUrl: string) {
        const requisitionRef = doc(db, "requisitions", requisitionId);
        try {
            await updateDoc(requisitionRef, { photoUrl: photoUrl });
            return true;
        } catch (error) {
            return false;
        }
    }

    public static async listRequisitions(): Promise<Requisition[]> {
        try {
            const querySnapshot = await getDocs(collection(db, "requisitions"));
            const requisitions: Requisition[] = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const req = new Requisition();
                req.setId(doc.id);
                req.setTitle(data.title);
                req.setDescription(data.description);
                req.setDate(data.date.toDate ? data.date.toDate() : new Date(data.date));
                req.setLatitude(data.latitude);
                req.setLongitude(data.longitude);
                req.setUserId(data.userId);
                req.setPhotoUrl(data.photoUrl);
                req.comments = data.comments || [];
                requisitions.push(req);
            });

            return requisitions;
        } catch (error) {
            console.error("Erro ao listar requisitions:", error);
            return [];
        }
    }

    public static async getRequisitionById(requisitionId: string): Promise<Requisition | null> {
        try {
            const docRef = doc(db, "requisitions", requisitionId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                const req = new Requisition();
                req.setId(docSnap.id);
                req.setTitle(data.title);
                req.setDescription(data.description);
                req.setDate(data.date.toDate ? data.date.toDate() : new Date(data.date));
                req.setLatitude(data.latitude);
                req.setLongitude(data.longitude);
                req.setUserId(data.userId);
                req.setPhotoUrl(data.photoUrl);
                req.comments = data.comments || [];
                return req;
            } else {
                console.log("Requisição não encontrada");
                return null;
            }
        } catch (error) {
            console.error("Erro ao buscar requisição:", error);
            return null;
        }
    }

    public static async addComment(requisitionId: string, comment: string): Promise<boolean> {
        const requisitionRef = doc(db, "requisitions", requisitionId);
        try {
            await updateDoc(requisitionRef, {
                comments: arrayUnion(comment)
            });
            return true;
        } catch (error) {
            console.error("Erro ao adicionar comentário:", error);
            return false;
        }
    }

    public static async deleteRequisition(req: Requisition): Promise<boolean> {
        const userId = await UserController.getUserId();
        if (!userId) {
            console.error("Usuário não autenticado. Não é possível deletar a requisição.");
            return false;
        }
        const requisitionRef = doc(db, "requisitions", req.getId());
        try {
            await ImageController.deleteImage(req.getPhotoUrl()!);
            await deleteDoc(requisitionRef);
            return true;
        } catch (error) {
            console.error("Erro ao deletar requisição:", error);
            return false;
        }
    }

    public static async updateRequisition(req: Requisition): Promise<boolean> {
        const userId = await UserController.getUserId();
        if (!userId) {
            console.error("Usuário não autenticado. Não é possível atualizar a requisição.");
            return false;
        }
        const requisitionRef = doc(db, "requisitions", req.getId());
        try {
            await updateDoc(requisitionRef, {
                title: req.getTitle(),
                description: req.getDescription(),
                date: req.getDate(),
                latitude: req.getLatitude(),
                longitude: req.getLongitude(),
                userId: req.getUserId(),
                photoUrl: req.getPhotoUrl(),
                comments: req.comments || []
            });
            return true;
        } catch (error) {
            console.error("Erro ao atualizar requisição:", error);
            return false;
        }
    
    }
}