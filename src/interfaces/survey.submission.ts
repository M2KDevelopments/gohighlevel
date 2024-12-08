export interface ISurveySubmission {
    id: string,
    contactId: string,
    createdAt: string,
    surveyId: string,
    name: string,
    email?: string,
    others?: {
        __submissions_other_field__: string,
        __custom_field_id__: string,
        eventData: {
            fbc: string,
            fbp: string,
            page: {
                url: string,
                title: string
            },
            type: string,
            domain: string,
            medium: string,
            source: string,
            version: string,
            adSource: string,
            mediumId: string,
            parentId: string,
            referrer: string,
            fbEventId: string,
            timestamp: number,
            parentName: string,
            fingerprint: string,
            pageVisitType: string,
            contactSessionIds: {
                ids: string[]
            }
        },
        fieldsOriSequance: string[]
    }
}