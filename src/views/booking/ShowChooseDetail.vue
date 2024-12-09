<template>
    <div>這頁是用來確認選擇</div>
    <div>
        <div>這裡是電影相關資訊</div>
        <div>這裡是票種相關資訊</div>
        <div>這裡是座位相關資訊</div>

        <div class="d-flex">
            <RouterLink :to="{ name: 'choose-seat-link' }" class=" btn btn-info">上一頁</RouterLink>
            <RouterLink :to="{ name: 'temp-money-link' }" @click="newOrder" class="ms-auto btn btn-info">結帳</RouterLink>
        </div>
    </div>
</template>

<script setup>
    import { useMemberBuyTicketOrderAPI } from '@/composables/booking/useMemberBuyTicketOrderAPI';
    import useBookingStore from '@/stores/bookingStore';
    
    const bookingStore = useBookingStore()
    const newOrder = () => {
        const detail = {
            storeId: bookingStore.storeId,
            auditoriumScheduleId: bookingStore.auditoriumScheduleId,
            seats: bookingStore.selectedSeats,
        }
        const order = {
            memberId: bookingStore.memberId,
            movieId: bookingStore.movieId,
            totalAmount: bookingStore.totalAmount,
            orderDetail: detail, 
        }
        useMemberBuyTicketOrderAPI().newOrder(order)
        bookingStore.setOrderId = useMemberBuyTicketOrderAPI().order.value.id
    }
    
</script>

<style scoped>

</style>