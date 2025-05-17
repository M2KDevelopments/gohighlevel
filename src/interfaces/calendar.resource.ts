export interface ICalendarResource {
    locationId: string,
    name: string,
    resourceType: string,
    isActive: boolean,
    description: string,
    quantity: number,
    outOfService: number,
    capacity: number,
    calendarIds: Array<string>
}