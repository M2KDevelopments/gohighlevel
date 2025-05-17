import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { IMediaLibraryParams, IMediaLibraryResponse } from "../interfaces/medialibrary";

export class MediaLibrary {
    private authData?: AuthData;

    /**
     * Endpoints For Media Library
     * https://highlevel.stoplight.io/docs/integrations/0a4bf8cac58a9-get-list-of-files
     */
    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Get List of Files
     * Documentation - https://highlevel.stoplight.io/docs/integrations/0a4bf8cac58a9-get-list-of-files
     * @param params 
     * @returns 
     */
    async getFiles(params: IMediaLibraryParams) {
        const headers = this.authData?.headers;
        const queryParams = new URLSearchParams();

        // Required parameter
        queryParams.append("locationId", params.locationId);

        // Optional parameters
        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());
        if (params.sortBy) queryParams.append("sortBy", params.sortBy);
        if (params.order) queryParams.append("order", params.order);
        if (params.search) queryParams.append("search", params.search);
        if (params.type) queryParams.append("type", params.type);

        const response = await axios.get(`${this.authData?.baseurl}/files?${queryParams.toString()}`, { headers });
        return response.data as IMediaLibraryResponse;
    }
}
