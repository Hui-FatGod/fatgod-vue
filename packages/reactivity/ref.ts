import { ReactiveFlags } from './constant'
import { Dep } from './dep'

/**
 * ref接口
 */
interface Ref<T> {
    get value(): T

    set value(val: T)
}

/**
 * ref实现
 */
class RefImpl<T> implements Ref<T> {
    public _value: T
    public readonly [ReactiveFlags.IS_REF] = true
    public dep: Dep = new Dep()

    constructor(value: T) {
        this._value = value
    }

    get value(): T {
        this.dep.track()
        return this._value
    }

    set value(value: T) {
        this._value = value
        this.dep.trigger()
    }
}

export function ref<T>(value: T) {
    return new RefImpl<T>(value)
}

