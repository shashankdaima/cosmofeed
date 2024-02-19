export class NotificationStatus {

    notificationId: number;
    deliveryStatus: 'pending' | 'delivered' | 'failed';
    error: string | undefined;
    channelType:string;
 
    constructor(notificationId: number, deliveryStatus: 'pending' | 'delivered' | 'failed', error: string | undefined, channelType: string) {
        this.notificationId = notificationId;
        this.deliveryStatus = deliveryStatus;
        this.error = error;
        this.channelType = channelType;
    }
}
