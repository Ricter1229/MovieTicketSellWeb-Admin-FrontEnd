<template>
    <div>{{ totalMoney }}</div>
    <div>
        <h1>選擇票種</h1>
            
        <!-- 標題行 -->
        <div class="container mt-3">
            <div class="card mb-3">
                <div class="card-body d-flex align-items-center">
                    <!-- 左側（票種標題） -->
                    <div class="flex-grow-1 text-start fw-bold">
                        票種
                    </div>

                    <!-- 中間（價格 + 數量） -->
                    <div class="price-quantity-container text-center fw-bold">
                        <span class="price">價格</span>
                        <span class="quantity-selector ms-3">數量</span>
                    </div>

                    <!-- 右側（小計標題） -->
                    <div class="subtotal text-end fw-bold">
                        小計
                    </div>
                </div>
            </div>
        </div>

        <!-- 卡片區塊 -->
        <div v-if="ticketTypes?.data">
            <div v-for="(ticketType, index) in ticketTypes.data" :key="index">
                <div class="container mt-3">
                    <div class="card mb-3">
                        <div class="card-body d-flex align-items-center">
                            <!-- 左側 -->
                            <div class="flex-grow-1">
                                <h5 class="card-title mb-1">
                                    {{ ticketType.name }} <i class="bi bi-info-circle"></i>
                                </h5>
                                <p class="card-text text-muted mb-0">
                                    {{ ticketType.detail }}
                                </p>
                            </div>

                            <!-- 中間 (價格 + 數量) -->
                            <div class="price-quantity-container">
                                <span class="price fw-bold">${{ ticketType.price }}</span>
                                <select
                                    class="form-select d-inline-block quantity-selector"
                                    @change="changeTicketQuality(index)"
                                    v-model="selectedQuantities[index]"
                                >
                                    <option
                                        v-for="ticketQuality in Array.from({ length: Math.floor(maxTicketQuantity / ticketTypes.data[index].movieTicketQuantity) + 1 }, (_, i) => i)"
                                        :value="ticketQuality"
                                    >
                                        {{ ticketQuality }}
                                    </option>
                                </select>
                            </div>

                            <!-- 右側 (小計) -->
                            <div class="subtotal">
                                <span class="fw-bold">${{ subtotals[index] }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 上/下一頁按鈕 -->
        <div class="d-flex">
            <RouterLink :to="{ name: 'booking-link' }" class=" btn btn-info">上一頁</RouterLink>
            <RouterLink :to="{ name: 'choose-seat-link' }" class="ms-auto btn btn-info">下一頁</RouterLink>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { useTicketTypeAPI } from "@/composables/booking/useTicketTypeAPI";
import useBookingStore from "@/stores/bookingStore";

const { ticketTypes, getAllTicketTypeRequest } = useTicketTypeAPI()
const bookingStore = useBookingStore()

let maxTicketQuantity = 10;
const selectedQuantities = reactive([]); // 存儲選中的數量
const subtotals = reactive([]); // 存儲小計
const eachMaxSelect = reactive([]) // 每種 ticket 最多選擇幾張 動態受到別人影響 加總最多10張
const totalMoney = ref(0) // 總金額

// 初始化數量和小計
const initializeQuantities = () => {
    ticketTypes.data?.forEach((ticket, index) => {
        // selectedTickets.push(ticket.name, ticket.quantity, ticket.subtotal)
        selectedQuantities[index] = 0; // 默認選擇數量為 0
        subtotals[index] = 0; // 默認小計為 0
        // eachMaxSelect[index] = Math.floor(maxTicketQuantity / ticketTypes.data[index].movieTicketQuantity)
    });
};

const changeTicketQuality = (index) => {
    subtotals[index] = ticketTypes.data[index].price * selectedQuantities[index];
    caculatorTotalMoney()
    bookingStore.selectedTickets.data = []
    for (let i = 0; i < ticketTypes.data.length; i++) {
        if(subtotals[i] != 0) {
            bookingStore.selectedTickets.push({
                name: ticketTypes.data[i].name,
                quantity: selectedQuantities[i],
            })
        }
    }    console.log(bookingStore.selectedTickets);

    // changeEachMaxSelect(index)
};

const caculatorTotalMoney = () => {
    totalMoney.value = 0;
    for (let i = 0; i < ticketTypes.data.length; i++) {
        totalMoney.value += subtotals[i]
    }
    bookingStore.setTotalAmount(totalMoney.value)
}

// const changeEachMaxSelect = (index) => {
//     // 初始可用的最大票数
//     let remainingQuantity = 10;

//     // 计算其他已选择的总数
//     for (let i = 0; i < ticketTypes.data.length; i++) {
//         if (i !== index) {
//             remainingQuantity -= selectedQuantities[i] * ticketTypes.data[i].movieTicketQuantity;
//         }
//     }
    
//     // 更新每个选项的最大可选数量
//     for (let i = 0; i < ticketTypes.data.length; i++) {
//         if (i !== index) {
//             eachMaxSelect[i] = Math.min(
//                 Math.floor(remainingQuantity / ticketTypes.data[i].movieTicketQuantity),
//                 eachMaxSelect[i] // 保留先前设定的限制
//             );
//         } else {
//             // 确保当前选项不受限制，避免无限循环
//             eachMaxSelect[i] = Math.floor(remainingQuantity / ticketTypes.data[i].movieTicketQuantity);
//         }
//     }
// }

onMounted( async () => {
    await getAllTicketTypeRequest()
    initializeQuantities()
})
</script>

<style scoped>
/* 移除標題行外框 */
.container.mt-3:first-of-type .card {
    border: none; /* 移除邊框 */
    box-shadow: none; /* 移除陰影 */
}
/* 保持每一個欄位的固定寬度 */
.price-quantity-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-basis: 200px; /* 固定寬度 */
}

.price {
    flex-basis: 80px; /* 價格欄寬度 */
    text-align: center;
}

.quantity-selector {
    flex-basis: 100px; /* 數量選擇器寬度 */
    margin-left: 10px;
}

.subtotal {
    flex-basis: 80px; /* 小計欄寬度 */
    text-align: right;
}

.text-start {
    text-align: left;
}

.text-center {
    text-align: center;
}

.text-end {
    text-align: right;
}

.fw-bold {
    font-weight: bold;
}
</style>

