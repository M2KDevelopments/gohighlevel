//https://highlevel.stoplight.io/docs/integrations/e55dec1be7bee-get-calendars
export interface ICalendarNotification {
    type: string | "email",
    shouldSendToContact: boolean,
    shouldSendToGuest: boolean,
    shouldSendToUser: boolean,
    shouldSendToSelectedUsers: boolean,
    selectedUsers: string
}

export interface ICalendarLocationConfigurations {
    kind: "custom" | "zoom_conference" | "google_conference" | "inbound_call" | "outbound_call" | "physicalbooker" | "ms_teams_conference",
    location: string,
    meetingId: string
}

export interface ICalendarTeamMember {
    userId: string,
    priority: 0 | 0.5 | 1,
    meetingLocationType: "custom" | "zoom" | "gmeet" | "phone" | "address" | "teams" | "booker",
    meetingLocation: string,
    isPrimary: boolean,
    locationConfigurations: Array<ICalendarLocationConfigurations>
}

export interface ICalendarRecurring {
    freq: "DAILY" | "WEEKLY" | "MONTHLY",
    count: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24,
    bookingOption: "skip" | "continue" | "book_next",
    bookingOverlapDefaultStatus: "confirmed" | "new"
}

export interface ICalendarHours {
    openHour: number,
    openMinute: number,
    closeHour: number,
    closeMinute: number
}


export interface ICalendarOpenHours {
    daysOfTheWeek: Array<number>,
    hours: Array<ICalendarHours>
}

export interface ICalendarAvailability {
    date: string,
    hours: Array<ICalendarHours>,
    deleted: boolean
}

export interface ICalendarLookBusyConfig {
    enabled: boolean,
    lookBusyPercentage: number
}

export interface ICalendar {
    id: string,
    isActive: boolean,
    notifications: Array<ICalendarNotification>,
    locationId: string,
    groupId: string,
    teamMembers: Array<ICalendarTeamMember>,
    eventType: string,
    name: string,
    description: string,
    slug: string,
    widgetSlug: string,
    calendarType: string,
    widgetType: string,
    eventTitle: string,
    eventColor: string,
    meetingLocation: string,
    locationConfigurations: Array<ICalendarLocationConfigurations>,
    slotDuration: number,
    slotDurationUnit: "mins" | "hours",
    slotInterval: number,
    slotIntervalUnit: "mins" | "hours",
    slotBuffer: number,
    slotBufferUnit: "mins" | "hours",
    preBuffer: number,
    preBufferUnit: "mins" | "hours",
    appoinmentPerSlot: number,
    appoinmentPerDay: number,
    allowBookingAfter: number,
    allowBookingAfterUnit: "hours" | "days" | "weeks" | "months",
    allowBookingFor: number,
    allowBookingForUnit: "days" | "weeks" | "months",
    openHours: Array<ICalendarOpenHours>,
    enableRecurring: boolean,
    recurring: ICalendarRecurring,
    formId: string,
    stickyContact: boolean,
    isLivePaymentMode: boolean,
    autoConfirm: boolean,
    shouldSendAlertEmailsToAssignedMember: boolean,
    alertEmail: string,
    googleInvitationEmails: boolean,
    allowReschedule: boolean,
    allowCancellation: boolean,
    shouldAssignContactToTeamMember: boolean,
    shouldSkipAssigningContactForExisting: boolean,
    notes: string,
    pixelId: string,
    formSubmitType: string,
    formSubmitRedirectURL: string,
    formSubmitThanksMessage: string,
    availabilityType?: 0 | 1 | null,
    availabilities: Array<ICalendarAvailability>,
    guestType: "count_only" | "collect_detail",
    consentLabel: string,
    calendarCoverImage: string,
    lookBusyConfig: ICalendarLookBusyConfig

}
