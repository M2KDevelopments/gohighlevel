import axios from "axios";
import { AuthData } from "../interfaces/auth/authdata";
import { 
    ISnapshotListResponse,
    ISnapshotListParams,
    ISnapshotShareLinkResponse,
    ISnapshotPushListResponse,
    ISnapshotPushParams,
    ILastSnapshotPushResponse
} from "../interfaces/snapshot";

export class Snapshots {
    private authData?: AuthData;

    constructor(authData?: AuthData) {
        this.authData = authData;
    }

    /**
     * Get Snapshots
     * Documentation - https://highlevel.stoplight.io/docs/integrations/b7ac59fac1e81-get-snapshots
     * @param params 
     * @returns 
     */
    async getAll(params?: ISnapshotListParams) {
        const headers = this.authData?.headers;
        const queryParams = new URLSearchParams();

        // Optional parameters
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.sort) queryParams.append("sort", params.sort);
        if (params?.order) queryParams.append("order", params.order);

        const url = `${this.authData?.baseurl}/snapshots${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        const response = await axios.get(url, { headers });
        return response.data as ISnapshotListResponse;
    }

    /**
     * Create Snapshot Share Link
     * Documentation - https://highlevel.stoplight.io/docs/integrations/7cfd7fa37e660-create-snapshot-share-link
     * @param snapshotId 
     * @returns 
     */
    async createShareLink(snapshotId: string) {
        const headers = this.authData?.headers;
        const response = await axios.post(
            `${this.authData?.baseurl}/snapshots/${snapshotId}/share`,
            {},
            { headers }
        );
        return response.data as ISnapshotShareLinkResponse;
    }

    /**
     * Get Snapshot Push Between Dates
     * Documentation - https://highlevel.stoplight.io/docs/integrations/3aafd3250cc4d-get-snapshot-push-between-dates
     * @param snapshotId 
     * @param params 
     * @returns 
     */
    async getPushBetweenDates(snapshotId: string, params: ISnapshotPushParams) {
        const headers = this.authData?.headers;
        const queryParams = new URLSearchParams();

        // Required parameters
        queryParams.append("startDate", params.startDate);
        queryParams.append("endDate", params.endDate);

        // Optional parameters
        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());

        const response = await axios.get(
            `${this.authData?.baseurl}/snapshots/${snapshotId}/pushes?${queryParams.toString()}`,
            { headers }
        );
        return response.data as ISnapshotPushListResponse;
    }

    /**
     * Get Last Snapshot Push
     * Documentation - https://highlevel.stoplight.io/docs/integrations/6c45f1aad5098-get-last-snapshot-push
     * @param snapshotId 
     * @returns 
     */
    async getLastPush(snapshotId: string) {
        const headers = this.authData?.headers;
        const response = await axios.get(
            `${this.authData?.baseurl}/snapshots/${snapshotId}/pushes/last`,
            { headers }
        );
        return response.data as ILastSnapshotPushResponse;
    }
}
