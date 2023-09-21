import { CacheOptions } from 'axios-cache-interceptor'
import { fetch, getQueryString, getTypeErrorMessage, getURL } from '../../utils'
import {
    IClub,
    IClubMember,
    IClubRelations,
    IClubSearchConfig,
    IClubStaff,
    ICommonConfig,
    IPagination
} from '../../types'

export class Clubs {
    #cacheConfig?: CacheOptions
    /**
     * Constructs an instance of the `clubs` client
     * @param cacheOptions Cache options to make the requests. See https://axios-cache-interceptor.js.org/config
     */
    constructor(cacheOptions?: CacheOptions) {
        this.#cacheConfig = cacheOptions
    }

    /**
     * Gets the data of a MyAnimeList club from its ID
     * @param id MyAnimeList ID of the club
     * @returns The data of the club
     */
    public getClubsById = async (id: string | number): Promise<IClub> => {
        if (typeof id !== 'string' && typeof id !== 'number')
            throw new TypeError(getTypeErrorMessage('id', 'string or number', typeof id))
        return (await fetch<{ data: IClub }>(getURL('clubs', `${id}`), this.#cacheConfig)).data
    }

    /**
     * Gets the members of a MyAnimeList club from its id
     * @param id MyAnimelist ID of the club
     * @returns Members of the club
     */
    public getClubMembers = async (
        id: string | number,
        config?: ICommonConfig
    ): Promise<{ pagination: IPagination; data: IClubMember[] }> => {
        if (typeof id !== 'string' && typeof id !== 'number')
            throw new TypeError(getTypeErrorMessage('id', 'string or number', typeof id))
        return await fetch<{ data: IClubMember[]; pagination: IPagination }>(
            getURL('clubs', `${id}`, 'members').concat(getQueryString<keyof ICommonConfig>(config || {})),
            this.#cacheConfig
        )
    }

    /**
     * Gets the staffs of a MyAnimeList club from its ID
     * @param id MyAnimeList ID of the club
     * @returns Staffs of the club
     */
    public getClubStaff = async (id: string | number): Promise<IClubStaff[]> => {
        if (typeof id !== 'string' && typeof id !== 'number')
            throw new TypeError(getTypeErrorMessage('id', 'string or number', typeof id))
        return (await fetch<{ data: IClubStaff[] }>(getURL('clubs', `${id}`, 'staff'))).data
    }

    /**
     * Gets the relations of a MyAnimeList club from its ID
     * @param id MyAnimeList ID of the club
     * @returns Relations of the club
     */
    public getClubRelations = async (id: string | number): Promise<IClubRelations> => {
        if (typeof id !== 'string' && typeof id !== 'number')
            throw new TypeError(getTypeErrorMessage('id', 'string or number', typeof id))
        return (await fetch<{ data: IClubRelations }>(getURL('clubs', `${id}`, 'relations'))).data
    }

    /**
     * Searches for MyAnimeList clubs
     * @param config Config to make the search
     * @returns Search results of the clubs
     */
    public getClubsSearch = async (config?: IClubSearchConfig) =>
        await fetch<{ data: IClub[]; pagination: IPagination }>(
            getURL('clubs').concat(getQueryString<keyof IClubSearchConfig>(config || {}))
        )
}
