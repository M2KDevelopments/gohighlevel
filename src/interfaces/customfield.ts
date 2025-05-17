export interface ICustomField {
    id: string;
    name: string;
    key: string;
    type: string;
    objectType: string;
    folderId?: string;
    required: boolean;
    options?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface ICustomFieldFolder {
    id: string;
    name: string;
    objectType: string;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateCustomField {
    name: string;
    key: string;
    type: "text" | "number" | "date" | "dropdown" | "checkbox" | "radio" | "textarea";
    objectType: string;
    folderId?: string;
    required?: boolean;
    options?: string[];
}

export interface IUpdateCustomField {
    name?: string;
    key?: string;
    type?: "text" | "number" | "date" | "dropdown" | "checkbox" | "radio" | "textarea";
    required?: boolean;
    options?: string[];
}

export interface ICreateCustomFieldFolder {
    name: string;
    objectType: string;
}

export interface IUpdateCustomFieldFolder {
    name: string;
}

export interface ICustomFieldResponse {
    customField: ICustomField;
    traceId: string;
}

export interface ICustomFieldFolderResponse {
    folder: ICustomFieldFolder;
    traceId: string;
}

export interface ICustomFieldListResponse {
    customFields: ICustomField[];
    total: number;
    traceId: string;
}

export interface ICustomFieldListParams {
    objectType: string;
    page?: number;
    limit?: number;
} 