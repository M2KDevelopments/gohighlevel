export interface ICalendarNotificationTime {
    timeOffset: number,
    unit: "hours" | string
}
export interface ICalendarNotification {
    _id: string,
    altType: "calendar" | string,
    calendarId: string,
    receiverType: "contact" | "guest" | "assignedUser" | "emails",
    additionalEmailIds: Array<string>,
    channel: "email" | "inApp",
    notificationType: "confirm" | "ticket" | "cancellation" | "reminder" | "followup" | "reschedule",
    isActive: boolean,
    templateId: string,
    body: string,
    subject: string,
    afterTime: Array<ICalendarNotificationTime>,
    beforeTime: Array<ICalendarNotificationTime>,
    selectedUsers: Array<string>,
    deleted: boolean
}