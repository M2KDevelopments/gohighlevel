export interface ITask {
    id?: string,
    title: string,
    body: string,
    assignedTo?: string,
    dueDate: string,
    completed: boolean,
    contactId: string,
}