import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { IContact } from "../interfaces/contact";
import { Gohighlevel } from "..";
import { Task } from "./contacts.tasks";
import { Note } from "./contacts.notes";
import { Campaign } from "./contacts.campaigns";
import { Workflow } from "./contacts.workflows";
import { Tag } from "./contacts.tags";
import { Appointment } from "./contacts.appointments";


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
     */
    constructor(authToken?: AuthData) {
        this.appointments = new Appointment(authToken);
        this.campaigns = new Campaign(authToken);
        this.workflows = new Workflow(authToken);
        this.tasks = new Task(authToken);
        this.notes = new Note(authToken);
        this.tags = new Tag(authToken);
        this.authData = authToken;
    }

    /**
     * Get contacts
     * Documentation - https://highlevel.stoplight.io/docs/integrations/dbe4f3a00a106-search-contacts
     */
    async getContacts() {
        const headers = this.authData?.headers;
        const body = {};
        const response = await axios.post(`${Gohighlevel.BASEURL}/contacts/search/`, body, { headers });
        const contacts: Array<IContact> = response.data.contacts;
        const total: number = response.data.total;
        return { total, contacts };
    }


    /**
     * Get Contacts By BusinessId
     * Documentation: https://highlevel.stoplight.io/docs/integrations/8efc6d5a99417-get-contacts-by-business-id
     * @param businessId 
     * @returns 
     */
    async getByBusinessId(businessId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${Gohighlevel.BASEURL}/contacts/business/${businessId}`, { headers });
        const contacts: Array<IContact> = response.data.contacts;
        const total: number = response.data.count;
        return { total, count: total, contacts };
    }


    /**
     * Get Contacts By Id
     * Documentation: https://highlevel.stoplight.io/docs/integrations/00c5ff21f0030-get-contact
     * @param contactId 
     * @returns 
     */
    async getOne(contactId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${Gohighlevel.BASEURL}/contacts/${contactId}`, { headers });
        const c: IContact = response.data.contact;
        return c;
    }


    /**
     * Creates a new contact with the provided information.
     * @param {CreateContactInfo} contact  - The contact information including email, name, phone, company, and source.
     * @returns The newly created contact.
     */
    async create(contact: IContact) {
        const headers = this.authData?.headers;
        const locationId = this.authData?.locationId
        const body = { ...contact, locationId: locationId };
        const response = await axios.post(`${Gohighlevel.BASEURL}/contacts/`, body, { headers });
        const c: IContact = response.data.contact;
        return c;
    }


    /**
     * Update contact
     * Documentation: https://highlevel.stoplight.io/docs/integrations/9ce5a739d4fb9-update-contact
     * @param {string} id 
     * @param contact 
     * @returns 
     */
    async update(id: string, contact: IContact) {
        const headers = this.authData?.headers;
        const locationId = this.authData?.locationId
        const body = { ...contact, locationId: locationId };
        const response = await axios.put(`${Gohighlevel.BASEURL}/contacts/${id}`, body, { headers });
        const c: IContact = response.data.contact;
        return c;
    }


    /**
     * Remove contact
     * Documentation: https://highlevel.stoplight.io/docs/integrations/28ab84e9522b6-delete-contact
     * @param id 
     */
    async remove(id: string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${Gohighlevel.BASEURL}/contacts/${id}`, { headers });
        return response.data.succeded as boolean;
    }

}




