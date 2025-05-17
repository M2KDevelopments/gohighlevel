export interface ICalendarEventAppointmentNote {
    id: string,
    body: string,
    userId: string,
    dateAdded: string,
    contactId: string,
    createdBy: {
        id: string,
        name: string
    }
}