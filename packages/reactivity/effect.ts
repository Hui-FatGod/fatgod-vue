export let activeSub: Function | undefined = undefined

export function effect(fn: Function): void {
    let prevSub = activeSub
    activeSub = fn
    activeSub()
    activeSub = prevSub
}