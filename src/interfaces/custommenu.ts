export interface ICustomMenuLink {
    id: string;
    name: string;
    url: string;
    icon?: string;
    order: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateCustomMenuLink {
    name: string;
    url: string;
    icon?: string;
    order?: number;
    isActive?: boolean;
}

export interface IUpdateCustomMenuLink {
    name?: string;
    url?: string;
    icon?: string;
    order?: number;
    isActive?: boolean;
}

export interface ICustomMenuLinkResponse {
    menuLink: ICustomMenuLink;
    traceId: string;
}

export interface ICustomMenuLinkListResponse {
    menuLinks: ICustomMenuLink[];
    total: number;
    traceId: string;
}

export interface ICustomMenuLinkListParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: "asc" | "desc";
    isActive?: boolean;
} 