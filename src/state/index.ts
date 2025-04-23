import { loadingType } from "../types"

export interface BaseState {
    loading: loadingType
    setLoading: (loading: loadingType) => void
}