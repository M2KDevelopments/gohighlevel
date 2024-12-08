import axios from "axios";
import { Gohighlevel } from "..";
import { AuthData } from "../interfaces/auth/authdata";
import { INote } from "../interfaces/note";

export class Note {
    private authData?: AuthData;

    /**
     * Endpoints For Contacts Notes
     * https://highlevel.stoplight.io/docs/integrations/db572d519b209-get-all-notes
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }



    /**
     * Get all Notes
     * Documentation - https://highlevel.stoplight.io/docs/integrations/73decb4b6d0c2-get-all-notes
     * @param contactId 
     */
    async getAll(contactId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${Gohighlevel.BASEURL}/contacts/${contactId}/notes`, { headers });
        return response.data.notes as INote[];
    }

    /**
     * Get Note
     * Documentation - https://highlevel.stoplight.io/docs/integrations/24cab1c2b3dfb-get-note
     * @param contactId 
     * @param noteId 
     * @returns 
     */
    async get(contactId: string, noteId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${Gohighlevel.BASEURL}/contacts/${contactId}/notes/${noteId}`, { headers });
        return response.data.note as INote;
    }

    /**
     * Create Note
     * Documentation - https://highlevel.stoplight.io/docs/integrations/5eab1684a9948-create-note
     * @param contactId 
     * @param note 
     * @returns 
     */
    async add(contactId: string, note: INote) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${Gohighlevel.BASEURL}/contacts/${contactId}/notes`, note, { headers });
        return response.data.note as INote;
    }

    /**
     * Update Note
     * Documentation - https://highlevel.stoplight.io/docs/integrations/71814e115658f-update-note
     * @param contactId 
     * @param noteId 
     * @param note 
     * @returns 
     */
    async update(contactId: string, noteId: string, note: INote) {
        const headers = this.authData?.headers;
        const response = await axios.put(`${Gohighlevel.BASEURL}/contacts/${contactId}/notes/${noteId}`, note, { headers });
        return response.data.note as INote;
    }

    /**
     * Delete Note
     * Documentation - https://highlevel.stoplight.io/docs/integrations/d7e867be69e9f-delete-note
     * @param contactId 
     * @param noteId 
     * @returns 
     */
    async remove(contactId: string, noteId: string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${Gohighlevel.BASEURL}/contacts/${contactId}/notes/${noteId}`, { headers });
        return response.data.succeded as boolean;
    }
}
