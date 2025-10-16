import { ref, uploadString, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../firebase";

export class ImageController {

    public static async uploadImage(base64Image: string, userId: string): Promise<string | null> {
        try {
            const imageRef = ref(storage, `requisitions/${userId}/${Date.now()}.jpg`);
            console.log("Uploading image to:", imageRef.fullPath);
            console.log("Image size (base64):", base64Image.length);
            console.log("User ID:", userId);
            console.log("base64Image sample:", base64Image.substring(0, 30) + "...");
            await uploadString(imageRef, base64Image, 'data_url');
            const downloadURL = await getDownloadURL(imageRef);
            return downloadURL;
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    }

    public static async deleteImage(imageUrl: string): Promise<boolean> {
        try {
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef);
            return true;
        } catch (error) {
            console.error("Error deleting image:", error);
            return false;
        }
    }

}
