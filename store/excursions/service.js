import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import {countriesAPI} from "../countries/service";

export const excursionsAPI = createApi({
    reducerPath: 'excursionsAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.DB_HOST}`}),
    endpoints: (build) => ({
        fetchExcursions: build.query({
            query: (token = '') => ({
                url: `/excursions/`,
                headers: {
                    Authorization: token
                }
            })
        })
    })
})
export const excursionAPI = createApi({
    reducerPath: 'excursionAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.DB_HOST}`}),
    endpoints: (build) => ({
        fetchExcursions: build.query({
            query: (token = '', id = 1) => ({
                url: `/excursions/${id}`,
                headers: {
                    Authorization: token
                }
            })
        })
    })
})