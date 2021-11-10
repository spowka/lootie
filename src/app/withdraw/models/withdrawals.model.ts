import { ShippingInfo } from 'src/app/auth/models';

export class WithdrawalsModel {
    _id: string;
    transaction: string;
    status: string;
    sentTimestamp: number;
    withdrawalType: string;
    shippingAddress: ShippingInfo;
    items: Item[];
    tracking?: Tracking;
    createdAt: string;
    updatedAt: string;
}

class Item {
    details: any;
    itemId: string;
}

class Tracking {
    trackingNumber: string;
    aftershipTrackingId: string;
    lastAftershipEventId: string;
    deliveryStatus: string;
    checkpoints: Checkpoints[];
    estimatedDelivery: string;
    shipmentWeight: number;
    shipmentWeightUnit: string;
    shipmentDeliveryDate: string;
    shipmentPickupDate: string;
    originCountry: string;
    destinationCountry: string;
}

class Checkpoints {
    location: string;
    message: string;
    deliveryStatus: string;
    checkpointTime: string;
}
