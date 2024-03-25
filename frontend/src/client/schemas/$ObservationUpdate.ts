/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ObservationUpdate = {
    properties: {
        title: {
    type: 'any-of',
    contains: [{
    type: 'string',
}, {
    type: 'null',
}],
},
        description: {
    type: 'any-of',
    contains: [{
    type: 'string',
}, {
    type: 'null',
}],
},
        latitude: {
    type: 'number',
    isRequired: true,
},
        longitude: {
     type: 'number',
     isRequired: true
},
        date_time: {
     type: 'string',
     isRequired: true
},
        pH: {
     type:'string',
     isRequired: true
},
        conductivity: {
     type:'number',
     isRequired: true
},
        DO: {
     type: 'number',
     isRequired: true
},
        contaminants: {
     type: 'string',
     isRequired: true
},
    },
} as const;
