export type TPizza = {
    id: string
    title: string
    price: number
    imageUrl: string
    sizes: number[]
    types: number[]
    rating: number
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export interface IPizzaSliceState {
    items: TPizza[]
    status: Status
}
