import { CacheOptions } from 'axios-cache-interceptor'
import { fetch, getQueryString, getURL } from '../../utils'
import { ICommonConfig, IPagination, IRandomRecommendation } from '../../types'

export class Recommendations {
    #cacheConfig?: CacheOptions
    /**
     * Constructs an instance of the [recommendations](https://docs.api.jikan.moe/#tag/recommendations) client
     * @param cacheOptions [Cache options](https://axios-cache-interceptor.js.org/config) for the client to make requests
     */
    constructor(cacheOptions?: CacheOptions) {
        this.#cacheConfig = cacheOptions
    }

    /**
     * Gets the list of recent anime recommendations in MyAnimeList
     * @param config Config to make the request
     * @returns List of recent anime recommendations in MyAnimeList
     */
    public getRecentAnimeRecommendations = async (
        config?: ICommonConfig
    ): Promise<{ data: IRandomRecommendation[]; pagination: IPagination }> =>
        await fetch<{ data: IRandomRecommendation[]; pagination: IPagination }>(
            getURL('recommendations', 'anime').concat(getQueryString<keyof ICommonConfig>(config || {})),
            this.#cacheConfig
        )

    /**
     * Gets the list of recent manga recommendations in MyAnimeList
     * @param config Config to make the request
     * @returns List of recent manga recommendations in MyAnimeList
     */
    public getRecentMangaRecommendations = async (
        config?: ICommonConfig
    ): Promise<{ data: IRandomRecommendation[]; pagination: IPagination }> =>
        await fetch<{ data: IRandomRecommendation[]; pagination: IPagination }>(
            getURL('recommendations', 'manga').concat(getQueryString<keyof ICommonConfig>(config || {})),
            this.#cacheConfig
        )
}
