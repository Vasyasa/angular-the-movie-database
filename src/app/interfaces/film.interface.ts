export interface Film {
    posterPath: string,
    genres: Genre[],
    id: number,
    title: string,
    overview: string,
    isChoosed: boolean
}

export interface Genre {
    id: number,
    name: string
}
