/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ObservationsOut = {
    properties: {
        data: {
    type: 'array',
    contains: {
        type: 'ObservationOut',
    },
    isRequired: true,
},
        count: {
    type: 'number',
    isRequired: true,
},
    },
} as const;
