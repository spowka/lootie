export class CaseViewItemModel {
    _id: string;
    value: number;
    assetId: string;
    availableVariants: VariantModel[];
    availableSizes: SizeModel[];
    color: string;
    image: string;
    originalImage: string;
    index: number;
    name: string;
    tag: string;
    odd: number;
    price: number;
    rangeEnd: number;
    rangeStart: number;
    descriptionText: string;
    descriptionBullets: string[];
    shippingInfo: any;
    type: string;
}

class VariantModel {
    product_id: string;
    variant_specifics: SpecificsModel[];
}

class SpecificsModel {
    dimension: string;
    value: string;
    price: string;
}

class SizeModel {
    _id: string;
    size: string;
    value: number;
}
