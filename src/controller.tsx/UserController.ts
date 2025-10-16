import { auth } from '../firebase';

export class UserController {
    static getUserId(): string | null {
        console.log("Current user ID:", auth.currentUser ? auth.currentUser.uid : null);
        return auth.currentUser ? auth.currentUser.uid : null;
    }
}