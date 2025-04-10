export interface IAppointment {
    id: string,
    calendarId: string,
    status: string,
    title: string,
    appoinmentStatus: string,
    assignedUserId: string,
    notes?: string,
    startTime: string,
    endTime: string,
    address: string,
    locationId: string,
    contactId: string,
    groupId?: string,
    appointmentStatus: string,
    users?: string[],
    dateAdded: string,
    dateUpdated: string,
    assignedResources?: string[]
}