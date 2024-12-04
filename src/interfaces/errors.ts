export interface error400 {
    statusCode: number,
    message: string
}

export interface error401 extends error400 {
    error: string
}


export interface error422 {
    statusCode: number,
    message: string | string[],
    error: string
}