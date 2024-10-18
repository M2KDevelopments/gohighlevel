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

export interface Contact {
    id: string;
    locationId: string;
    contactName: string;
    firstName: string;
    lastName: string;
    firstNameRaw: string;
    lastNameRaw: string;
    companyName: string | null;
    email: string;
    phone: string;
    dnd: boolean;
    dndSettings: DndSettings;
    type: string;
    source: string | null;
    assignedTo: string | null;
    city: string | null;
    state: string | null;
    postalCode: string | null;
    address1: string | null;
    dateAdded: string;
    dateUpdated: string;
    dateOfBirth: string | null;
    businessId: string | null;
    tags: string[];
    followers: string[];
    country: string;
    website: string | null;
    timezone: string;
    profilePhoto: string;
    additionalEmails: string[];
    attributions: Attribution[];
    customFields: CustomField[];
}
