<template>
    <div class="auditorium">
        <!-- 确保数据已加载 -->
        <div v-if="seatingList.data?.seats">
            <!-- 每一行 -->
            <div class="row d-flex align-items-center mb-2" v-for="row in seatingList.data.seats" :key="row.row">
                <!-- 行标题 -->
                <div class="row-label p-2">{{ row.row }}</div>
                <!-- 座位 -->
                <div 
                    class="seat justify-content-center align-items-center btn " 
                    v-for="seat in row.seats" 
                    :key="seat"
                    :class="{ walkway: seat === null, selected: isSelected(row, seat)}"
                    @click="clickedSeat(row, seat)"
                > 
                    {{ seat || '' }}
                </div>
                <!-- 行标题 -->
                <div class="row-label p-2">{{ row.row }}</div>
            </div>           
            
        </div>
        
        <!-- 加载中提示 -->
        <div v-else>
            加载中...
        </div>
    </div>
</template>

<script setup>
    import { useSeating } from '@/composables/test/useSeatingAPI'; 
    import { onMounted, ref } from 'vue';
    import useBookingStore from '@/stores/bookingStore.js';

    const { seatingList, seatingListRequest } = useSeating();
    const bookingStore = useBookingStore()

    const clickedSeat = (row, seat) => {
        const seatKey = `${row.row}-${seat}`
        if (bookingStore.selectedSeats.includes(seatKey)) {
            // 如果数组中已经有 seatKey，则移除它
            const index = bookingStore.selectedSeats.indexOf(seatKey);
            if (index > -1) {
                bookingStore.selectedSeats.splice(index, 1);
            }
        } else {
            // 如果数组中没有 seatKey，则添加它
            bookingStore.selectedSeats.push(seatKey);
        }
        console.log(bookingStore.selectedSeats);
        
    };

    const isSelected = (row, seat) => {
        return bookingStore.selectedSeats.includes(`${row.row}-${seat}`)
    }

    onMounted(() => {
        seatingListRequest();
    });
</script>

<style scoped>
.auditorium {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.row {
  display: flex;
  align-items: center; /* 确保行标题和座位垂直居中对齐 */
}

.row-label {
  font-weight: bold;
  width: 60px; /* 固定宽度 */
  text-align: center; /* 居中显示行标题 */
}

.space-seat {
  width: 40px; /* 固定座位大小 */
  height: 40px;
  background-color: #ffffff;
  border: 1px solid #ffffff;
  text-align: center;
  line-height: 40px; /* 垂直居中 */
  border-radius: 4px;
  margin:  2px 2px;
}

.seat {
  width: 40px; /* 固定座位大小 */
  height: 40px;
  background-color: #ddd;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 40px; /* 垂直居中 */
  border-radius: 4px;
  margin: 0 2px;
}

.seat.selected {
  background-color: #4caf50; /* 选中的座位颜色 */
  color: white;
}

.seat.walkway {
  background-color: transparent; /* 通道的座位背景透明 */
  border: none;
}

.mx-1 {
  margin-left: 5px;
  margin-right: 5px;
}
</style>