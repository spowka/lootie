export class WithdrawalQueryModel {
    withdrawalOption: string;
    shipping: {
        firstName: string,
        lastName: string,
        phoneNumber: string,
        address: string,
        postalCode: string,
        country: 'CA | FR | US',
        city: string,
        province: string,
        email: string,
    };
    items: WithdrawalItems[];
}

class WithdrawalItems {
    id: string;
    details: {
        size: string
    };
}
