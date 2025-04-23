'use client'

// custom imports 
import { themeType } from "./types"
import { UnSecureContext } from "./errors";

// third part 
import { useState } from "react";

// theme utils 
export const getPropValue = (prop: string) => globalThis.window?.getComputedStyle(document.documentElement).getPropertyValue(prop)

export function getTheme(): themeType {
    return {
        bg: {
            primary: getPropValue('--bg-primary'),
            secondary: getPropValue('--bg-secondary')
        },
        font: {
            primary: getPropValue('--font-color-primary'),
            secondary: getPropValue('--font-color-secondary')
        }, 
        playground: {
            primary: getPropValue('--playground-bg-primary'),
            secondary: getPropValue('--playground-bg-secondary')
        }, 
    }
}

// state management utils
export function useCustomState<T>(initialState: any): [T, (newState: any) => any] {
    const [state, setState] = useState(initialState);
    const setCustomSate = (newState: any) => {
        setState((prevState: any) => ({...prevState, ...newState}))
    };
    
    return [state, setCustomSate];
}

export function constructUrl(url: string, args: Object) {
    if (!args) return url

    url += "?";
    for (const [arg, value] of Object.entries(args)) {
        url += `${arg}=${value}&`
    }

    return url
}

// misc utils
export function copyToClipboard(text: string): void {
    if (!navigator.clipboard) {
        try {
            throw new UnSecureContext()

        } catch (error) {
            console.error(error)
            return
        }
    } 
    navigator.clipboard.writeText(text)
}

export function elapsedTime(start: Date): string {
    const end = new Date()
    const diff = end.getTime() - start.getTime()

    const seconds = Math.floor(diff / 1000)
    const mins = Math.floor(seconds / 60)
    const hours = Math.floor(mins / 60)
    const days = Math.floor(hours / 24)

    let elapsed = ""
    if (days > 0) {
        elapsed += `${days} days`
    } else if (hours > 0) {
        elapsed += `${hours} hours`
    } else if (mins > 0) {
        elapsed += `${mins} minutes`
    } else {
        elapsed += `${seconds} seconds`
    }

    return elapsed
}