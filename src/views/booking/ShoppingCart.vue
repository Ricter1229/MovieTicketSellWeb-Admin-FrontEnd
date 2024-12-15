<template>
    <!-- 右側購物車 -->
    <div >
            <h2>購物車</h2>
            <div>{{ bookingStore.movieChineseName }}</div>
            <div>{{ bookingStore.storeId }}</div>
            <div>{{ bookingStore.timeslot }}</div>
            <div>{{ bookingStore.selectedTickets }}</div>
            <div>{{ bookingStore.selectedSeats }}</div>
        </div>
</template>

<script setup>
    import useBookingStore from '@/stores/bookingStore';
    const bookingStore = useBookingStore()
</script>

<style scoped>

</style>