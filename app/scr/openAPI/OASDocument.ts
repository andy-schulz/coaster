export interface OASDocument{
    info: object,
    tags: object,
    paths: OASPaths,
    externalDocs: object,
    servers: OASServer[],
    components: object,
    [key: string]: any
}

export interface OASServer {
    url:string
}

export interface OASPaths {
    [key: string]: OASPath
}

export interface OASPath {
    parameters?: OASParameter[],
    post: OASOperation,
    put: OASOperation,
    patch: OASOperation,
    get: OASOperation,
    delete: OASOperation,
    head: OASOperation,
    options: OASOperation,
    trace: OASOperation
}

export interface OASOperation {
    tags: string[],
    summary: string,
    description: string,
    operationId: string,
    responses: OASResponses,
    security: object,
    requestBody: object,
    parameters?: OASParameter[]
}

export interface OASResponses {
    [key: string]: OASResponse,

}

export interface OASResponse {
    description: string,
}

export interface OASParameter {
    name: string,
    in: "path" | "query" | "cookie" | "header",
    description: string,
    required: boolean,
    style?: OASParameterPathStyle | OASParameterQueryStyle | OASParameterCookieStyle | OASParameterHeaderStyle
    explode?: boolean,
    schema?: OASParameterSchema,
    content?: OASParameterContent
}

export type OASParameterPathStyle = "simple" | "label" | "matrix"
export type OASParameterQueryStyle = "form" | "spaceDelimited" | "pipeDelimited" | "deepObject"
export type OASParameterCookieStyle = "simple"
export type OASParameterHeaderStyle = "form"

export interface OASParameterSchema {
    type:  OASTypes
    items?: OASParameterItems
}

export interface OASParameterItems {
    type: OASTypes,
    enum: string[],
    default: string
}

export type OASTypes = "string" | "number" | "boolean" | "array" | "object"

export interface OASParameterContent {

}