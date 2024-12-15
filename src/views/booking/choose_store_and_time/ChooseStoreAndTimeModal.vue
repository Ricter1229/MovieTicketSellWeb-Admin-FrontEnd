<template>
    <div>
        <!-- Modal about Store -->
        <div ref="storeModleRef" class="modal fade modal-lg modal-dialog-scrollable" id="storeModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">請選擇影城</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div v-for="(storesAndTimeslot, index) in storesAndTimeslots">
                            <a class="btn btn-primary" @click="showTimeslotsModal(index)">
                                {{storesAndTimeslot.store}}
                            </a>
                        </div>
                    </div>
                    <!-- <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div> -->
                </div>
            </div>
        </div>

        <!-- Modal about Timeslots -->
        <div ref="timeslotsModleRef" class="modal fade modal-lg modal-dialog-scrollable" id="timeslotsModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">請選擇時間段</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div v-if="showTimeslotsStoreIndex !== null && storesAndTimeslots[showTimeslotsStoreIndex]">
                            <RouterLink
                                to="/booking"
                                class="btn btn-info" 
                                v-for="timeslot in storesAndTimeslots[showTimeslotsStoreIndex].timeslots" 
                                :key="timeslot"
                                @click="storeTimeslot(timeslot)"
                            >
                                {{ timeslot }}
                            </RouterLink>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue'
    import bootstrapBundleMin from 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import useBookingStore from '@/stores/bookingStore';

    const storeModleRef = ref(null)
    const storeModal = ref(null)
    const timeslotsModleRef = ref(null)
    const timeslotsModle = ref(null)
    const showTimeslotsStoreIndex = ref(null)
    const bookingStore = useBookingStore()

    const storesAndTimeslots = [
        {
            store: "大安",
            timeslots: [
                "11:00", "12:00", "13:00",
            ]
        },
        {
            store: "台北",
            timeslots: [
                "11:00"
            ]
        },
        {
            store: "新北",
            timeslots: [
                "11:00", "12:00",
            ]
        },
    ]


    onMounted(() => {
        storeModal.value = new bootstrapBundleMin.Modal(storeModleRef.value)        
        timeslotsModle.value = new bootstrapBundleMin.Modal(timeslotsModleRef.value)
    })

    

    const showTimeslotsModal = index => {
        // store store id
        bookingStore.setStoreId(index)

        showTimeslotsStoreIndex.value = index
        storeModal.value.hide()
        timeslotsModle.value.show()
    }
    const storeTimeslot = timeslot => {
        bookingStore.setTimeslot(timeslot)
        timeslotsModle.value.hide()
    }

    const openModal = () => {
        storeModal.value.show()
    }

    defineExpose({
        openModal,
    })    
</script>

<style scoped>
    .modal-body a {
        margin: 10px;
    }
</style>