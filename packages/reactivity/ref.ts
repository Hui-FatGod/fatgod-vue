import { ReactiveFlags } from './constant'
import { activeSub } from "./effect";

class RefImpl<T> {
    public _value: T
    public readonly [ReactiveFlags.IS_REF] = true
    public sub?: Function

    constructor(value: T) {
        this._value = value
    }

    get value(): T {
        // 收集依赖
        this.sub = activeSub
        return this._value
    }

    set value(value: T) {
        this._value = value
        // 触发更新
        if (this.sub) {
            this.sub()
        }
    }
}

export function ref<T>(value: T) {
    return new RefImpl<T>(value)
}