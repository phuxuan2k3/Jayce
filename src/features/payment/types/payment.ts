export type CreatePaymentLinkRequest = {
    description: string;
    items: PaymentItem[];
    buyerName: string;
    buyerEmail: string;
    buyerPhone: string;
    buyerAddress: string;
};

export type PaymentItem = {
    name: string;
    quantity: number;
    price: number;
}

export type CreatePaymentLinkResponse = {
    bin: string;
    accountNumber: string;
    accountName: string;
    amount: number;
    description: string;
    orderCode: number;
    currency: string;
    paymentLinkId: string;
    status: "PENDING" | "CANCELLED" | "PAID" | "EXPIRED";
    checkoutUrl: string;
    qrCode: string;
    expiredAt: number;
}

export type NullableInt32 = {
    Int32: number;
    Valid: boolean;
}

export type NullableTime = {
    Time: string;
    Valid: boolean;
}

export type Order = {
    id: number;
    userid: number;
    amount: NullableInt32;
    accountnumber: string;
    currency: string;
    description: string;
    createdat: NullableTime;
    updatedat: NullableTime;
    status: "PENDING" | "CANCELLED" | "PAID" | "EXPIRED";
}

export type PaymentInfo = {
    id: string;
    orderCode: number;
    amount: number;
    amountPaid: number;
    amountRemaining: number;
    status: "CANCELLED" | "PENDING" | "PAID" | "EXPIRED";
    createAt: string;
    transactions: any[];
    cancellationReason: string | null;
    cancelAt: string | null;
}