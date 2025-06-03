import { ReactiveFlags } from './constant'
import { activeSub } from './effect'

class RefImpl<T> {
    public _value: T
    public readonly [ReactiveFlags.IS_REF] = true
    public subs: Link | undefined
    public subsHead: Link | undefined

    constructor(value: T) {
        this._value = value
    }

    get value(): T {
        // 收集依赖
        this.track()
        return this._value
    }

    set value(value: T) {
        this._value = value
        // 触发更新
        this.trigger()
    }

    // 收集依赖
    private track() {
        if (!activeSub) {
            return
        }
        const link = new Link(activeSub)
        if (!this.subs) {
            this.subs = this.subsHead = link
            return
        }
        this.subs.nextSub = link
        link.prevSub = this.subs
        this.subs = link
    }

    // 触发更新
    private trigger() {
        let link: Link | undefined = this.subsHead
        const pendingSubs: Function[] = []
        while (link) {
            pendingSubs.push(link.sub)
            link = link.nextSub
        }
        pendingSubs.forEach(pendingSub => pendingSub())
    }
}

export function ref<T>(value: T) {
    return new RefImpl<T>(value)
}

class Link {
    public nextSub: Link | undefined
    public prevSub: Link | undefined

    constructor(public sub: Function) {
    }
}