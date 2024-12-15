<template>
    <div>
        <h1>這裡是結帳後顯示的地方</h1>
    </div>
</template>

<script setup>
import { useMemberBuyTicketOrderAPI } from '@/composables/booking/useMemberBuyTicketOrderAPI';
import { onMounted } from 'vue';
import useBookingStore from '@/stores/bookingStore';

const bookingStore = useBookingStore()
const { changeOrderStatus } = useMemberBuyTicketOrderAPI()
const requestChangeOrderStatus = {
    "orderId": bookingStore.orderId,
    "status": "CANCELED"
}

changeOrderStatus()

</script>

<style lang="scss" scoped>

</style>