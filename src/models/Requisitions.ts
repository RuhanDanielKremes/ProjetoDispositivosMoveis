export class Requisition {
    private id: string;
    private title: string;
    private description: string;
    private date: Date;
    private latitude: number;
    private longitude: number;
    private userId?: string;
    private photoUrl?: string;
    public comments?: string[];

    public constructor() {
        this.id = "";
        this.title = "";
        this.description = "";
        this.date = new Date();
        this.latitude = 0;
        this.longitude = 0;
        this.userId = undefined;
        this.photoUrl = undefined;
    }

    public getId(): string {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public getDescription(): string {
        return this.description;
    }

    public getUserId(): string {
        return this.userId || '';
    }

    public getDate(): Date {
        return this.date;
    }

    public getLatitude(): number {
        return this.latitude;
    }
    public getLongitude(): number {
        return this.longitude;
    }

    public getPhotoUrl(): string {
        return this.photoUrl || '';
    }

    public setId(id: string): void {
        this.id = id;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public setUserId(userId: string): void {
        this.userId = userId;
    }

    public setDate(date: Date): void {
        this.date = date;
    }

    public setLatitude(latitude: number): void {
        this.latitude = latitude;
    }

    public setLongitude(longitude: number): void {
        this.longitude = longitude;
    }

    public setPhotoUrl(photoUrl: string): void {
        this.photoUrl = photoUrl;
    }


    public static fromJson(json: any): Requisition {
        let requisition = new Requisition();
        requisition.setId(json.id);
        requisition.setTitle(json.title);
        requisition.setDescription(json.description);
        requisition.setDate(new Date(json.date));
        requisition.setLatitude(json.latitude);
        requisition.setLongitude(json.longitude);
        requisition.setUserId(json.userId);
        requisition.setPhotoUrl(json.photoUrl);
        return requisition;
    }
}
