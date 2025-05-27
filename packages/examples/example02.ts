import { ref } from '../reactivity/ref'
import { effect } from '../reactivity/effect'

const gameName = ref('Dark Souls')

effect(() => {
    console.log(`fat-god's favorite game =============>`, gameName.value)
})

effect(() => {
    console.log('the best souls game =============>', gameName.value)
})

gameName.value = 'Dark Souls III'