import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { Contact } from "../interfaces/contact";

interface CreateContactInfo {
    email: string,
    name: string,
    phone: string,
    company?: string,
    source?: string
}


export class Contacts {
    private authData?: AuthData;


    /**
     * Endpoints For Contacts
     * https://highlevel.stoplight.io/docs/integrations/e957726e8625d-contacts-api
     */
    constructor(authToken?: AuthData) {
        this.authData = authToken;
    }

    getAll() {

    }

    getOne(contactId: string) {

    }

    findByName(name: string) {

    }

    findByNameAndEmail(name: string, email: string) {

    }


    /**
     * Creates a new contact with the provided information.
     * 
     * @param contact - The contact information including email, name, phone, company, and source.
     * @returns The newly created contact.
     */
    async create(contact: CreateContactInfo) {
        const access_token = this.authData?.access_token;
        const headers = {
            "Version": "2021-04-15",
            "Authorization": "Bearer " + access_token,
            "Accept": 'application/json'
        }
        const body = {
            "locationId": location,
            "name": contact.name,
            "firstName": contact.name.split(" ")[0],
            "lastName": contact.name.split(" ").length > 1 ? contact.name.split(" ")[1] : "",
            "companyName": contact.company,
            "email": contact.email,
            "phone": contact.phone,
            "source": contact.source,
        };
        const response = await axios.post(`https://services.leadconnectorhq.com/contacts/`, body, { headers });
        const c: Contact = response.data.contact;
        return c;
    }

    update() {

    }

    remove() {

    }
}

