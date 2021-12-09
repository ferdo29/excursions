import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import {countriesAPI} from "../countries/service";

export const popularPlacesAPI = createApi({
    reducerPath: 'popularPlacesAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.DB_HOST}`}),
    endpoints: (build) => ({
        fetchPopularPlaces: build.query({
            query: (token = '', country= 1) => ({
                url: `/cities/${country}`,
                headers: {
                    Authorization: token
                }
            })
        })
    })
})