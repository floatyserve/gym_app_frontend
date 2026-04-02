import type { ApiError } from "../types/api/ApiError";
import { ResourceType } from "../types/api/ResourceType";

export function resolveErrorMessage(error: ApiError): string {
    switch (error.code) {
        case "ALREADY_EXISTS": {
           return  handleAlreadyExistsError(error);
        }

        case "REFERENCE_NOT_FOUND":
            return "The requested resource was not found.";

        case "BAD_CREDENTIALS":
            return handleBadCredentialsError(error);

        case "BAD_REQUEST":
            return handleBadRequestError(error);

        case "VALIDATION_ERROR":
            return handleValidationError(error);

        default:
            return "Something went wrong. Please try again.";
    }
}

function handleBadCredentialsError(error: ApiError) : string{
    const message = error.message;

    return message ? message : "Invalid email or password.";
}

function handleAlreadyExistsError(error: ApiError): string {
    const context = error.context as {
        resource?: ResourceType;
        field?: string;
    } | undefined;

    const readableResourceName = context?.resource
        ? context.resource
            .toLowerCase()
            .replace(/_/g, " ")
            .replace(/^\w/, c => c.toUpperCase())
        : "Resource";

    if (context?.resource) {
        return context.field
            ? `${readableResourceName} with this ${context.field} already exists.`
            : `${readableResourceName} already exists.`;
    }
    
    return "The resource already exists.";
}

function handleBadRequestError(error: ApiError): string {
    const context = error.context as {
        resource?: ResourceType;
        field?: string;
        reason?: string
    } | undefined;

    return context?.reason ? `${context.reason}` : "Bad request";
}

//TODO: improve method to read message.context
function handleValidationError(error: ApiError): string {
    if (!error.message) {
        return "Validation error";
    }

    if (!error.message.includes(':')) {
        return error.message;
    }

    const [messageString, fieldsString] = error.message.split(': ');

    const formattedFields = (fieldsString || "").split(',').map(field => {
        return field
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    });

    return `${messageString}: ${formattedFields.join(', ')}`;
}