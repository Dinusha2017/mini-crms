import { SalesOpportunity } from "./sales-opportunity.model";

export class User {
    public id: string;
    public name: string;
    public email: string;
    public tel: string;
    public address: string;
    public status: string;
    public createdDateTime: string;
    public salesOpportunities: Array<SalesOpportunity>;

    constructor(id: string, name: string, email: string, tel: string, address: string, status: string, createdDateTime: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.tel = tel;
        this.address = address;
        this.status = status;
        this.createdDateTime = createdDateTime;
        this.salesOpportunities = [];
    }
}
