export class NotificationStatus {
    id: string;
    notificationId: string;
    deliveryStatus: 'pending' | 'delivered' | 'failed';
    error: string | undefined;
    channelType:string;
 
    constructor(id: string, notificationId: string, deliveryStatus: 'pending' | 'delivered' | 'failed', error: string | undefined, channelType: string) {
        this.id = id;
        this.notificationId = notificationId;
        this.deliveryStatus = deliveryStatus;
        this.error = error;
        this.channelType = channelType;
    }
}
