export let activeSub: Function | undefined = undefined

export function effect(fn: Function): void {
    activeSub = fn
    activeSub()
    activeSub = undefined
}