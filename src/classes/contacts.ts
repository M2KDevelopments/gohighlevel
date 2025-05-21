import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { IContact } from "../interfaces/contact";
import { Task } from "./contacts.tasks";
import { Note } from "./contacts.notes";
import { Campaign } from "./contacts.campaigns";
import { Workflow } from "./contacts.workflows";
import { Tag } from "./contacts.tags";
import { Appointment } from "./contacts.appointments";
import { IContactSearchFilter } from "../interfaces/contact.search.filter";


export class Contacts {
    private authData?: AuthData;
    public tasks: Task;
    public notes: Note;
    public campaigns: Campaign;
    public workflows: Workflow;
    public tags: Tag;
    public appointments: Appointment;


    /**
     * Endpoints For Contacts
     * https://highlevel.stoplight.io/docs/integrations/e957726e8625d-contacts-api
     * https://public-api.gohighlevel.com/#0097b747-33c2-452f-8c78-aab5ab36c071
     */
    constructor(authData?: AuthData) {
        this.appointments = new Appointment(authData);
        this.campaigns = new Campaign(authData);
        this.workflows = new Workflow(authData);
        this.tasks = new Task(authData);
        this.notes = new Note(authData);
        this.tags = new Tag(authData);
        this.authData = authData;
    }


    /**
     * Get contacts. [Deprecated]
     * Documentation - https://highlevel.stoplight.io/docs/integrations/dbe4f3a00a106-search-contacts
     * @param locationId 
     * @param filters 
     * @returns 
     */
    async get(locationId: string, filters: { query?: string, startAfter?: number, startAfterId?: string, limit?: number }) {
        const headers = this.authData?.headers;
        let q = ``;
        if (filters.query) q = `&query=${filters.query}`;
        if (filters.startAfter) q = `&startAfter=${filters.startAfter}`
        if (filters.startAfterId) q = `&startAfterId=${filters.startAfterId}`
        if (filters.limit) q = `&limit=${filters.limit}`

        const response = await axios.get(`${this.authData?.baseurl}/contacts?locationId=${locationId}${q}`, { headers });
        const contacts: Array<IContact> = response.data.contacts;
        const count: number = response.data.count;
        return { count, contacts };
    }


    /**
     * Get Contacts and Search contacts. For both App and API version
     * Documentation - https://highlevel.stoplight.io/docs/integrations/dbe4f3a00a106-search-contacts
     * Documentation - https://public-api.gohighlevel.com/#dac71866-cddd-48e9-ba77-99fd293594fa
     * @param query 
     * @param order 
     * @param sortBy  
     * @param limit
    */
    async search(query: string = '', order: 'asc' | 'desc' = 'desc', sortBy: 'date_added' | 'date_updated' = 'date_added', limit: number = 20) {
        const headers = this.authData?.headers;
        if (this.authData?.useAPIKey) {
            const response = await axios.get(`${this.authData?.baseurl}/contacts/?limit=${limit}&query=${query}&sortBy=${sortBy}&order=${order}`, { headers });
            const contacts: Array<IContact> = response.data.contacts;
            const total: number = response.data.meta.total;
            return { total, contacts };
        } else {
            const body = {};
            const response = await axios.post(`${this.authData?.baseurl}/contacts/search/`, body, { headers });
            const contacts: Array<IContact> = response.data.contacts;
            const total: number = response.data.total;
            return { total, contacts };

        }
    }

    /**
     * Get  Searched contacts use filters.
     * Documentation - https://highlevel.stoplight.io/docs/integrations/dbe4f3a00a106-search-contacts
     * Documnetation on Filters - https://doc.clickup.com/8631005/d/h/87cpx-158396/6e629989abe7fad
     * @param query 
    */
    async searchWithFilters(query: IContactSearchFilter) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${this.authData?.baseurl}/contacts/search/`, query, { headers });
        const contacts: Array<IContact> = response.data.contacts;
        const total: number = response.data.total;
        return { total, contacts };
    }

    /**
     * Search contact by email or phone number.. Only For API version
     * Documentation - https://public-api.gohighlevel.com/#5f4bde90-5179-43b2-b38d-f09b7bb771ad
     * @param email 
     * @param phone 
    */
    async lookup(email: string = "", phone: string = "") {
        const headers = this.authData?.headers;
        if (this.authData?.useAPIKey) {
            const response = await axios.get(`${this.authData?.baseurl}/contacts/lookup?email=${email}&phone=${phone}`, { headers });
            const contacts: Array<IContact> = response.data.contacts;
            return contacts;
        } else {
            throw new Error("You need to use an API key to call this function. Look at the documentation here https://public-api.gohighlevel.com/#5f4bde90-5179-43b2-b38d-f09b7bb771ad")
        }
    }


    /**
     * Get Contacts By BusinessId
     * Documentation: https://highlevel.stoplight.io/docs/integrations/8efc6d5a99417-get-contacts-by-business-id
     * @param businessId 
     * @returns 
     */
    async getByBusinessId(businessId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/contacts/business/${businessId}`, { headers });
        const contacts: Array<IContact> = response.data.contacts;
        const total: number = response.data.count;
        return { total, count: total, contacts };
    }


    /**
     * Get Contacts By Id. For other GHL App and API version
     * Documentation: https://highlevel.stoplight.io/docs/integrations/00c5ff21f0030-get-contact
     * @param contactId 
     * @returns 
     */
    async getOne(contactId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${this.authData?.baseurl}/contacts/${contactId}`, { headers });
        const c: IContact = response.data.contact;
        return c;
    }


    /**
     * Creates a new contact with the provided information. For other GHL App and API version
     * Documentation: https://public-api.gohighlevel.com/#5fbc2b83-603d-4974-81c3-7d8658a79594
     * @param {CreateContactInfo} contact  - The contact information including email, name, phone, company, and source.
     * @returns The newly created contact.
     */
    async create(contact: IContact, locationId: string = "") {
        const l = locationId ? locationId : this.authData?.locationId;
        const headers = this.authData?.headers;
        const body = this.authData?.useAPIKey ? contact : { ...contact, locationId: l };
        const response = await axios.post(`${this.authData?.baseurl}/contacts/`, body, { headers });
        const c: IContact = response.data.contact;
        return c;
    }


    /**
     * Update contact. For other GHL App and API version
     * Documentation: https://highlevel.stoplight.io/docs/integrations/9ce5a739d4fb9-update-contact
     * Documentation: https://public-api.gohighlevel.com/#1c7060e2-ebaf-4b5b-9248-be0292689bba
     * @param {string} id 
     * @param contact 
     * @returns 
     */
    async update(id: string, contact: IContact, locationId: string = "") {
        const l = locationId ? locationId : this.authData?.locationId;
        const headers = this.authData?.headers;
        const body = this.authData?.useAPIKey ? contact : { ...contact, locationId: l };
        const response = await axios.put(`${this.authData?.baseurl}/contacts/${id}`, body, { headers });
        const c: IContact = response.data.contact;
        return c;
    }


    /**
     * Remove contact. For other GHL App and API version
     * Documentation: https://highlevel.stoplight.io/docs/integrations/28ab84e9522b6-delete-contact
     * Documentation: https://public-api.gohighlevel.com/#546cdf6c-3367-4569-b3c4-46d9f13a71ba
     * @param id 
     */
    async remove(id: string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${this.authData?.baseurl}/contacts/${id}`, { headers });
        return (response.data?.succeded || true) as boolean;
    }

}


