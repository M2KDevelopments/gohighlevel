export interface Credientials {
    clientId: string,
    clientSecret: string,
    redirectUri: string,
    scopes: ['companies.readonly' |
        'conversations.readonly' |
        'links.write' |
        'links.readonly' |

        'calendars.write' |
        'calendars.readonly' |
        'calendars/events.readonly' |
        'calendars/events.write' |

        'calendars/groups.readonly' |
        'calendars/groups.write' |

        'calendars/resources.readonly' |
        'calendars/resources.write' |

        'locations.write' |
        'locations/customFields.readonly' |
        'locations/customValues.write' |
        'locations/customFields.write' |
        'locations/customValues.readonly' |
        'locations/tags.write' |
        'locations/tags.readonly' |
        'locations.readonly' |
        'opportunities.readonly' |
        'opportunities.write' |
        'businesses.readonly' |
        'businesses.write' |
        'contacts.readonly' |
        'contacts.write' |
        'locations/tasks.readonly' |
        'locations/tasks.write'] | string[],
    isWhiteLabel: boolean
}