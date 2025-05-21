export interface IContactSearchFilterSort {
    field: string,
    direction: "desc" | "asc"
}

export interface ISearchRange {
    gte?: string,
    gt?: string,
    lte?: string,
    lt?: string,
}

export interface ISearchSimpleFilter {
    field: string,
    operator: "eq" | "not_exists" | "range" | "exists" | "not_contains" | "contains" | "eq" | "not_eq",
    value: string | boolean | ISearchRange
}

export interface ISearchComplexFilter{
    group: "OR" |"AND",
    filters:ISearchSimpleFilter[]
}

export interface IContactSearchFilter {
    locationId: string,
    pageLimit: number,
    page?: number,
    searchAfter?: string[],
    filters: (ISearchComplexFilter | ISearchSimpleFilter)[],
    sort: IContactSearchFilterSort[]

}