import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { 
    ICustomFieldResponse,
    ICustomFieldFolderResponse,
    ICustomFieldListResponse,
    ICustomFieldListParams,
    ICreateCustomField,
    IUpdateCustomField,
    ICreateCustomFieldFolder,
    IUpdateCustomFieldFolder
} from "../interfaces/customfield";

export class CustomFields {
    private authData?: AuthData;

    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Create Custom Field
     * Documentation - https://highlevel.stoplight.io/docs/integrations/55c9675bf56ce-create-custom-field
     * @param data 
     * @returns 
     */
    async create(data: ICreateCustomField) {
        const headers = this.authData?.headers;
        const response = await axios.post(
            `${this.authData?.baseurl}/custom-fields`,
            data,
            { headers }
        );
        return response.data as ICustomFieldResponse;
    }

    /**
     * Update Custom Field by ID
     * Documentation - https://highlevel.stoplight.io/docs/integrations/0d21eea479ed7-update-custom-field-by-id
     * @param fieldId 
     * @param data 
     * @returns 
     */
    async update(fieldId: string, data: IUpdateCustomField) {
        const headers = this.authData?.headers;
        const response = await axios.patch(
            `${this.authData?.baseurl}/custom-fields/${fieldId}`,
            data,
            { headers }
        );
        return response.data as ICustomFieldResponse;
    }

    /**
     * Delete Custom Field by ID
     * Documentation - https://highlevel.stoplight.io/docs/integrations/65ae8f7b10460-delete-custom-field-by-id
     * @param fieldId 
     * @returns 
     */
    async delete(fieldId: string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(
            `${this.authData?.baseurl}/custom-fields/${fieldId}`,
            { headers }
        );
        return response.data as ICustomFieldResponse;
    }

    /**
     * Get Custom Fields by Object Key
     * Documentation - https://highlevel.stoplight.io/docs/integrations/33719c4eef9bd-get-custom-fields-by-object-key
     * @param params 
     * @returns 
     */
    async getByObjectType(params: ICustomFieldListParams) {
        const headers = this.authData?.headers;
        const queryParams = new URLSearchParams();

        // Required parameter
        queryParams.append("objectType", params.objectType);

        // Optional parameters
        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());

        const response = await axios.get(
            `${this.authData?.baseurl}/custom-fields?${queryParams.toString()}`,
            { headers }
        );
        return response.data as ICustomFieldListResponse;
    }

    /**
     * Create Custom Field Folder
     * Documentation - https://highlevel.stoplight.io/docs/integrations/52e9e97f3c50a-create-custom-field-folder
     * @param data 
     * @returns 
     */
    async createFolder(data: ICreateCustomFieldFolder) {
        const headers = this.authData?.headers;
        const response = await axios.post(
            `${this.authData?.baseurl}/custom-fields/folders`,
            data,
            { headers }
        );
        return response.data as ICustomFieldFolderResponse;
    }

    /**
     * Get Custom Field Folder by ID
     * Documentation - https://highlevel.stoplight.io/docs/integrations/e08551df3d324-get-custom-field-folder-by-id
     * @param folderId 
     * @returns 
     */
    async getFolder(folderId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(
            `${this.authData?.baseurl}/custom-fields/folders/${folderId}`,
            { headers }
        );
        return response.data as ICustomFieldFolderResponse;
    }

    /**
     * Update Custom Field Folder Name
     * Documentation - https://highlevel.stoplight.io/docs/integrations/0bd8bc7fd50ff-update-custom-field-folder-name
     * @param folderId 
     * @param data 
     * @returns 
     */
    async updateFolder(folderId: string, data: IUpdateCustomFieldFolder) {
        const headers = this.authData?.headers;
        const response = await axios.patch(
            `${this.authData?.baseurl}/custom-fields/folders/${folderId}`,
            data,
            { headers }
        );
        return response.data as ICustomFieldFolderResponse;
    }

    /**
     * Delete Custom Field Folder
     * Documentation - https://highlevel.stoplight.io/docs/integrations/ca8b8b09ee5a0-delete-custom-field-folder
     * @param folderId 
     * @returns 
     */
    async deleteFolder(folderId: string) {
        const headers = this.authData?.headers;
        const response = await axios.delete(
            `${this.authData?.baseurl}/custom-fields/folders/${folderId}`,
            { headers }
        );
        return response.data as ICustomFieldFolderResponse;
    }
}
