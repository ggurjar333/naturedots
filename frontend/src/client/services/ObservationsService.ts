/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObservationCreate } from '../models/ObservationCreate';
import type { ObservationOut } from '../models/ObservationOut';
import type { ObservationsOut } from '../models/ObservationsOut';
import type { ObservationUpdate } from '../models/ObservationUpdate';
import type { Message } from '../models/Message';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ObservationsService {

    /**
     * Read Observations
     * Retrieve observations.
     * @returns ObservationsOut Successful Response
     * @throws ApiError
     */
    public static readObservations({
skip,
limit = 100,
}: {
skip?: number,
limit?: number,
}): CancelablePromise<ObservationsOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/observations/',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Observation
     * Create new observation.
     * @returns ObservationOut Successful Response
     * @throws ApiError
     */
    public static createObservation({
requestBody,
}: {
requestBody: ObservationCreate,
}): CancelablePromise<ObservationOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/observations/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Observation
     * Get observation by ID.
     * @returns ObservationOut Successful Response
     * @throws ApiError
     */
    public static readObservation({
id,
}: {
id: number,
}): CancelablePromise<ObservationOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/observations/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Observation
     * Update an observation.
     * @returns ObservationOut Successful Response
     * @throws ApiError
     */
    public static updateObservation({
id,
requestBody,
}: {
id: number,
requestBody: ObservationUpdate,
}): CancelablePromise<ObservationOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/observations/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Observation
     * Delete an observation.
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static deleteObservation({
id,
}: {
id: number,
}): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/observations/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
