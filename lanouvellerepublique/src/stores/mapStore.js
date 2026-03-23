import { ref } from "vue"

export const userCoords = ref(null)

let requested = false

export function requestGeolocation() {
    if (requested || !navigator.geolocation) return
    requested = true
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            userCoords.value = [pos.coords.latitude, pos.coords.longitude]
        },
        () => {}, // permission denied or error — silently ignore
    )
}
