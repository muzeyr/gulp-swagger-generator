/// <reference path="../typings.d.ts" />
import parse = require('./parse');
import parser = require('swagger-parser');
export interface ITypeMapper {
    getType(item: parser.IHasTypeInformation): IType;
}
export interface IType {
    name: string;
    definition: Definition;
    isAnonymous: boolean;
    isBuiltin: boolean;
    isDefinition: boolean;
    isArray: boolean;
    isLanguageType: boolean;
}
export declare function getTypeMapper(): ITypeMapper;
export declare function setTypeMapper(typeMapper: ITypeMapper): void;
export interface IGenerationContext {
    definitions?: Definition[];
    definitionsMap?: {
        [ref: string]: Definition;
    };
    operations?: Operation[];
    host?: string;
    basePath?: string;
    defaultConsumes?: string[];
    defaultProduces?: string[];
}
export declare function buildHandlebarsContext(api: parse.IParsedSwagger, renameDefinitions: {
    [from: string]: string;
}): any;
export declare class Operation {
    rawPath: string;
    pathSegments: {
        name: string;
        isParam: boolean;
    }[];
    verb: string;
    requestBody: any;
    successResponse: any;
    errorResponse: any;
    headers: Argument[];
    query: Argument[];
    formData: Argument[];
    pathParams: Argument[];
    args: Argument[];
    requestContentType: string;
    responseContentType: string;
    isJsonRequest: boolean;
    isJsonResponse: boolean;
    isBinaryResponse: boolean;
    isFormDataRequest: boolean;
    description: string;
    consumes: string[];
    produces: string[];
    successSamples: {
        [contentType: string]: any;
    };
    security: string;
    constructor(pathName: string, verb: string, path: parser.IPath, method: parser.IOperation, context: IGenerationContext);
}
export declare class Argument implements parser.IHasTypeInformation {
    name: string;
    in: string;
    type: string;
    format: string;
    $ref: string;
    items: parser.IHasTypeInformation;
    description: string;
    optional: boolean;
    additionalProperties: parser.IHasTypeInformation;
    constructor(parameter: parser.IParameterOrReference);
}
export declare class Definition {
    rawName: string;
    nameParts: string[];
    properties: Property[];
    ancestorRef: string;
    ancestor: Definition;
    constructor(name: string, schema: parser.ISchema);
}
export declare class Property implements parser.IHasTypeInformation {
    name: string;
    type: string;
    format: string;
    $ref: string;
    description: string;
    items: parser.IHasTypeInformation;
    definition: Definition;
    additionalProperties: parser.IHasTypeInformation;
    constructor(name: string, schema: parser.IProperty);
}
