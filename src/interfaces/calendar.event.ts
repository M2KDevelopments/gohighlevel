export interface ICalendarEvent {
    id: string,
    address: string,
    title: string,
    calendarId: string,
    locationId: string,
    contactId: string,
    groupId: string,
    appointmentStatus: string,
    assignedUserId: string,
    users: Array<string>,
    notes: string,
    isRecurring: boolean,
    rrule: string,
    startTime: string,
    endTime: string,
    dateAdded: string,
    dateUpdated: string,
    assignedResources: Array<string>,
    createdBy: {
        userId: string,
        source: string
    },
    masterEventId: string
}


export interface ICalendarEventAppointment {
    title: string,
    meetingLocationType: string,
    meetingLocationId: string,
    overrideLocationConfig: boolean,
    appointmentStatus: string,
    assignedUserId: string,
    address: string,
    ignoreDateRange: boolean,
    toNotify: boolean,
    ignoreFreeSlotValidation: boolean,
    rrule: string,
    calendarId: string,
    startTime: string,
    endTime: string
  }