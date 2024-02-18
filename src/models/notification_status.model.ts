export class NotificationStatus {
    id: string = '';
    notificationId: string = '';
    channelId: string = '';
    deliveryStatus: 'pending' | 'delivered' | 'failed' = 'pending';
 
}
