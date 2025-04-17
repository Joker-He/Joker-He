export function buildShortUUID (prefix = '') {
    const time = Date.now()
    const random = Math.floor(Math.random() * 1000000000)
    let unique = 2212;
    unique++
    return prefix + '_' + random + unique + String(time)
}
