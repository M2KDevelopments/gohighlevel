import { AuthData } from "../interfaces/auth/authdata";
import { PaymentIntegrations } from "./payments.integrations";
import { PaymentOrderFulfillments } from "./payments.orderfulfillments";
import { PaymentTransactions } from "./payments.transactions";
import { PaymentSubscriptions } from "./payments.subscriptions";
import { PaymentCoupons } from "./payments.coupons";
import { PaymentCustomProviders } from "./payments.customproviders";
import { PaymentOrders } from "./payments.orders";

export class Payments {
    private authData?: AuthData;
    public integrations: PaymentIntegrations;
    public orders: PaymentOrders;
    public fulfillments: PaymentOrderFulfillments;
    public transactions: PaymentTransactions;
    public subscriptions: PaymentSubscriptions;
    public coupons: PaymentCoupons;
    public customProviders: PaymentCustomProviders;

    constructor(authData?: AuthData) {
        this.authData = authData;
        this.integrations = new PaymentIntegrations(authData);
        this.orders = new PaymentOrders(authData);
        this.fulfillments = new PaymentOrderFulfillments(authData);
        this.transactions = new PaymentTransactions(authData);
        this.subscriptions = new PaymentSubscriptions(authData);
        this.coupons = new PaymentCoupons(authData);
        this.customProviders = new PaymentCustomProviders(authData);
    }
}
