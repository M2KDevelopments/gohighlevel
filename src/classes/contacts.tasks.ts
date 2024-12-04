import axios from "axios";
import { Gohighlevel } from "..";
import { AuthData } from "../interfaces/auth/authdata";
import { ITask } from "../interfaces/task";

export class Task {
    private authData?: AuthData;

    /**
     * Endpoints For Contacts for Tasks
     * https://highlevel.stoplight.io/docs/integrations/db572d519b209-get-all-tasks
     */
    constructor(authToken?: AuthData) {
        this.authData = authToken;
    }


    /**
     * Get all Tasks
     * Documentation - https://highlevel.stoplight.io/docs/integrations/db572d519b209-get-all-tasks
     * @param contactId 
     */
    async getAll(contactId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${Gohighlevel.BASEURL}/contacts/${contactId}/tasks`, { headers });
        return response.data.tasks as ITask[];
    }

    /**
     * Get Task
     * Documentation - https://highlevel.stoplight.io/docs/integrations/c4d36fb259656-get-task
     * @param contactId 
     * @param taskId 
     * @returns 
     */
    async get(contactId: string, taskId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(`${Gohighlevel.BASEURL}/contacts/${contactId}/tasks/${taskId}`, { headers });
        return response.data.task as ITask;
    }

    /**
     * Create Task
     * Documentation - https://highlevel.stoplight.io/docs/integrations/fa57d1470b87c-create-task
     * @param contactId 
     * @param task 
     * @returns 
     */
    async add(contactId: string, task: ITask) {
        const headers = this.authData?.headers;
        const response = await axios.post(`${Gohighlevel.BASEURL}/contacts/${contactId}/tasks`, task, { headers });
        return response.data.task as ITask;
    }

    /**
     * Update Task
     * Documentation - https://highlevel.stoplight.io/docs/integrations/82e1223e90ec9-update-task
     * @param contactId 
     * @param taskId 
     * @param task 
     * @returns 
     */
    async update(contactId: string, taskId: string, task: ITask) {
        const headers = this.authData?.headers;
        const response = await axios.put(`${Gohighlevel.BASEURL}/contacts/${contactId}/tasks/${taskId}`, task, { headers });
        return response.data.task as ITask;
    }

    /**
     * Delete Task
     * Documentation - https://highlevel.stoplight.io/docs/integrations/506ee1741ec7e-delete-task
     * @param contactId 
     * @param taskId 
     * @returns 
     */
    async remove(contactId: string, taskId: string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(`${Gohighlevel.BASEURL}/contacts/${contactId}/tasks/${taskId}`, { headers });
        return response.data.succeded as boolean;
    }

    /**
     * Complete Task
     * Documentation - https://highlevel.stoplight.io/docs/integrations/b03d53971d208-update-task-completed
     * @param contactId 
     * @param taskId 
     * @returns 
     */
    async completed(contactId: string, taskId: string) {
        const headers = this.authData?.headers;
        const response = await axios.put(`${Gohighlevel.BASEURL}/contacts/${contactId}/tasks/${taskId}/completed`, {}, { headers });
        return response.data as ITask;
    }
}