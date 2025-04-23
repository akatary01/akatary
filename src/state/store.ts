import { BaseState } from ".";
import { loadingType, setStateType } from "../types";


export function baseState<T extends BaseState>(set: setStateType<T>, get: () => T) {
    return {
        loading: {on: false},
        setLoading: (loading: loadingType) => {
            set({loading} as T)
        },
    }
}