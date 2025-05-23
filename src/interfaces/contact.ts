interface DndSettings {
    Call: DndChannel;
    Email: DndChannel;
    SMS: DndChannel;
    FB: DndChannel;
    GMB: DndChannel;
}

interface DndChannel {
    code: string;
    message: string;
    status: string;
}

interface Attribution {
    utmSessionSource: string;
    isFirst: boolean;
    medium: string;
}

interface CustomField {
    id: string;
    value: string;
}


interface CustomFieldUpdate {
    id: string;
    key: string;
    field_value: string;
}

export interface IContact {
    id?: string;
    locationId: string;
    firstName: string;
    lastName: string;
    firstNameRaw?: string;
    lastNameRaw?: string;
    contactName?: string;
    companyName?: string | null;
    email?: string;
    phone?: string;
    dnd?: boolean;
    dndSettings?: DndSettings;
    type?: string;
    source?: string | null;
    assignedTo?: string | null;
    city?: string | null;
    state?: string | null;
    postalCode?: string | null;
    address1?: string | null;
    dateAdded?: string;
    dateUpdated?: string;
    dateOfBirth?: string | null;
    businessId?: string | null;
    tags?: string[];
    followers?: string[];
    country?: string;
    website?: string | null;
    timezone?: string;
    profilePhoto?: string;
    additionalEmails?: string[];
    attributions?: Attribution[];
    customFields?: CustomField[] | CustomFieldUpdate[];
}
