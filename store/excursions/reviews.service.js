import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import {countriesAPI} from "../countries/service";

export const reviewsAPI = createApi({
    reducerPath: 'reviewsAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.DB_HOST}`}),
    endpoints: (build) => ({
        fetchExcursions: build.query({
            query: (token = '', id = 1, ) => ({
                url: `/excursions/${id}/reviews`,
                headers: {
                    Authorization: token
                }
            })
        })
    })
})