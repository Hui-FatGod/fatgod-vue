import { activeSub, type Subscriber } from './effect'

/**
 * 链表节点
 */
export class Link {
    public nextSub: Link | undefined
    public prevSub: Link | undefined

    constructor(public sub: Subscriber) {
    }
}

/**
 * 依赖
 */
export class Dep {
    public subs: Link | undefined
    public subsHead: Link | undefined

    /**
     * 收集依赖
     */
    public track(): void {
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

    /**
     * 触发更新
     */
    public trigger(): void {
        let link: Link | undefined = this.subsHead
        const pendingSubs: Subscriber[] = []
        while (link) {
            pendingSubs.push(link.sub)
            link = link.nextSub
        }
        pendingSubs.forEach(pendingSub => pendingSub.notify())
    }
}