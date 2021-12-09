import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";

export const countriesAPI = createApi({
    reducerPath: 'countriesAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.DB_HOST}`}),
    endpoints: (build) => ({
        fetchCountries: build.query({
            query: (token = '') => ({
                url: '/countries',
                headers: {
                    Authorization: token
                }
            })
        })
    })
})