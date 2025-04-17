import { nextTick, onMounted, onActivated } from 'vue'
export function onMountedOrActivated (hook:any) {
  let mounted:any
  onMounted(() => {
    hook()
    nextTick(() => {
      mounted = true
    })
  })
  onActivated(() => {
    if (mounted) {
      hook()
    }
  })
}
