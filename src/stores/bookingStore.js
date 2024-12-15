import { defineStore } from "pinia"
import { reactive, ref } from "vue"

const useBookingStore = defineStore("bookingStore", () => {
    const memberId = ref(null)
    memberId.value = 1

    const movieId = ref(null)
    movieId.value = 1
    const setmovieId = val => movieId.value = val

    const storeId = ref(null)
    const setStoreId = val => storeId.value = val

    const timeslot = ref(null)
    const setTimeslot = val => timeslot.value = val

    const selectedSeats = ref([]); 

    const selectedTickets = reactive([]); 

    const totalAmount = ref(0)
    const setTotalAmount = val => totalAmount.value = val

    const auditoriumScheduleId = ref(0)
    auditoriumScheduleId.value = 1
    const setAuditoriumScheduleId = val => auditoriumScheduleId.value = val
    
    const orderId = ref(0)
    const setOrderId = val => orderId.value = val

    return {
        memberId,
        totalAmount, setTotalAmount,
        movieId, setmovieId,
        storeId, setStoreId,
        timeslot, setTimeslot,
        orderId,setOrderId,
        selectedSeats,
        selectedTickets,
        auditoriumScheduleId, setAuditoriumScheduleId
    }
})

export default useBookingStore