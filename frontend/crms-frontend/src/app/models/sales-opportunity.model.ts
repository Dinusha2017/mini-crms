export class SalesOpportunity {
    public _id: string;
    public name: string;
    public status: string;

    constructor(id: string, name: string, status: string) {
        this._id = id;
        this.name = name;
        this.status = status;
    }
}
