<template>
    <div class="d-flex">
        <!-- 日曆 -->
        <div class="calendar-container">
            <div style="display: flex;">
                <!-- 影城、影廳切換下拉選單 -->
                <div style="flex-grow: 1;">
                    <div>
                        <select v-model="nowStore" @change="updateAuditorium">
                            <option v-for="store in stores" :key="store.id" :value="store">{{ store.name }}</option>
                        </select>
                    </div>
                    <div>
                        <select v-if="nowStore && nowStore.auditoriums" v-model="nowAuditorium">
                            <option v-for="auditorium in nowStore.auditoriums" :key="auditorium.id" :value="auditorium">
                                {{ auditorium.name }}</option>
                        </select>
                    </div>
                </div>

                <!-- 存檔 清空按鈕 -->
                <div>
                    <button class="btn btn-outline-success">存檔</button>
                    <button @click="clearInputSchedule" class="btn btn-outline-secondary">清空</button>
                </div>
            </div>

            <!-- 週、日按钮切换 -->
            <div class="view-switch">
                <button @click="changeToWeek" class="btn btn-primary">Week View</button>
                <button @click="changeToDay" class="btn btn-primary">Day View</button>
            </div>

            <!-- 时间段与排程 -->
            <div class="day">
                <!-- 时间段列 -->
                <div class="time-column">
                    <div class="time-header">時間段</div>
                    <div v-for="time in timeSlots" :key="time" class="time-slot">
                        <div>[{{ time }}]</div>
                    </div>
                </div>

                <!-- 日视图 -->
                <div v-if="nowIs == 'day'" class="schedule-column">
                    <div class="date-header">{{ formattedDay }}</div>
                    <div  v-for="time in timeSlots" :key="time">
                        <div
                            class="schedule-item" 
                            @dragover.prevent 
                            @drop="handleDrop(formattedDay, time)"
                        >
                            <div v-for="item in (droppedItems[nowStore.id]?.[nowAuditorium.id]?.[formattedDay]?.[time] || [])"
                                    :key="item.id" class="dropped-item d-flex"
                                    draggable="true" @dragstart="handleDragStart(item, formattedDay, time)">
                                <span>{{ item.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 周视图 -->
                <div v-else class="schedule-week">
                    <div class="day-column" v-for="day in week" :key="day">
                        <div class="date-header">{{ day }}</div>
                        <div v-for="time in timeSlots" :key="time" class="schedule-item" @dragover.prevent
                            @drop="handleDrop(day, time)">
                            <div v-for="item in (droppedItems[nowStore.id]?.[nowAuditorium.id]?.[day]?.[time] || [])"
                                :key="item.id" class="dropped-item d-flex"
                                draggable="true" @dragstart="handleDragStart(item, day, time)">
                                <span>{{ item.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 底部翻页按钮 -->
            <div class="navigation">
                <button @click="back" class="btn btn-secondary">&lt;</button>
                <button @click="next" class="btn btn-secondary">&gt;</button>
            </div>
        </div>


        <!-- 影城提供的電影列表 -->
        <div style="border: 1px solid red;">
            <div>
                {{ nowStore.name }} 提供的電影
            </div>
            <div v-if="nowStore" v-for="movie in nowStore.movies" :key="movie.id" class="d-flex" calss="card w-75 mb-3">
                <div class="card-body" draggable="true" @dragstart="handleDragStart(movie)">
                    <div class="card-title">{{ movie.name }}</div>
                    <div card-text>
                        <img :src="movie.imgSrc" :alt="movie.name">
                        <div>{{ movie.time }}分鐘</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import {  computed, onMounted, reactive, ref, watch } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'; // 引入中文语言包
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.locale('zh-cn'); // 设置语言为中文
dayjs.extend(utc);
dayjs.extend(timezone);

// 设置默认时区为台湾
dayjs.tz.setDefault("Asia/Taipei");


const day = ref(dayjs().tz()) // 保存原始日期
const formattedDay = computed(() => day.value.format("MM-DD(dd)"))
const week = ref([])
const weekOffset = ref(0);


const nowIs = ref(null)

const droppedItems = reactive({}); // 记录每个时间段的图片
const currentDraggedItem = ref(null); // 当前拖拽的图片
const dragInTimeSlot = ref([]) // 记录從原本時程表拖拽的图片

const timeSlots = ref([])

const stores = reactive([
    {
        id: 1, name: '台北',
        auditoriums: [
            { id: 1, name: '台北影廳 1' },
            { id: 2, name: '台北影廳 2' },
        ],
        movies: [
            { id: 1, name: 'Overload', time: 120, imgSrc: '/src/assets/OVERLOED.jpg' },
            { id: 2, name: '刀劍神域-序列戰爭', time: 240, imgSrc: '/src/assets/SAO.jpg' },
        ],
    },
    {
        id: 2, name: '台中',
        auditoriums: [
            { id: 1, name: '台中影廳 1' },
            { id: 2, name: '台中影廳 2' },
        ],
        movies: [
            { id: 2, name: '刀劍神域-序列戰爭', time: 150, imgSrc: '/src/assets/SAO.jpg' },
        ],
    },
    {
        id: 3, name: '台南',
        auditoriums: [
            { id: 1, name: '台南影廳 1' },
            { id: 2, name: '台南影廳 2' },
        ],
        movies: [
            { id: 1, name: 'Overload', time: 120, imgSrc: '/src/assets/OVERLOED.jpg' },
        ],
    },
])
const nowStore = ref(stores[0]); // 默认选中第一个商店
const nowAuditorium = ref(stores[0].auditoriums[0]); // 默认选中第一个商店的第一个影厅


const init = () => {
    nowIs.value = 'day'

    setTimeSlot()
    createDayCalendar()
}

const setTimeSlot = () => {
    const startOfDay = dayjs().tz().startOf("day"); // 当天开始时间 (00:00)
    const endOfDay = dayjs().tz().endOf("day"); // 当天结束时间 (23:59)

    let currentTime = startOfDay;

    while (currentTime.isBefore(endOfDay)) {
        // const time = currentTime.format("HH:mm")
        const time = currentTime.format("HH:mm")
        timeSlots.value.push(time); // 格式化为小时:分钟
        currentTime = currentTime.add(2, "hour"); // 每次增加 2 小时
    }
}

const createDayCalendar = () => {
    day.value = dayjs().tz()
}

const createWeekCalendar = (offset = 0) => {
    // 使用偏移量计算指定周的开始和结束时间
    const startOfWeek = day.value.startOf("week").add(offset, "week"); // 偏移到指定周
    const endOfWeek = dayjs(startOfWeek).endOf("week"); // 偏移后的结束时间

    let currentTime = startOfWeek;
    day.value = startOfWeek

    week.value = []
    while (currentTime.isBefore(endOfWeek)) {
        week.value.push(currentTime.format("MM-DD(dd)"));
        currentTime = currentTime.add(1, "day");
    }

    week.value.forEach((weekDay) => {
        initializeDroppedItems(weekDay)
    });
}

// 初始化对应日期的结构
const initializeDroppedItems = (dateKey, time = null) => {
    const storeKey = nowStore.value.id; // 當前影城ID
    const auditoriumKey = nowAuditorium.value.id; // 當前影廳ID

    // 動態生成嵌套結構
    if (!droppedItems[storeKey]) droppedItems[storeKey] = {};
    if (!droppedItems[storeKey][auditoriumKey]) droppedItems[storeKey][auditoriumKey] = {};
    if (!droppedItems[storeKey][auditoriumKey][dateKey]) droppedItems[storeKey][auditoriumKey][dateKey] = {};
    if (time != null && !droppedItems[storeKey][auditoriumKey][dateKey][time]) {
        droppedItems[storeKey][auditoriumKey][dateKey][time] = [];
    }
};

const back = () => {
    if (nowIs.value == 'day') {
        const previousDay = day.value.subtract(1, 'day'); // 减去一天
        day.value = previousDay;

        // 初始化对应日期的结构
        initializeDroppedItems(previousDay)
    }
    else if (nowIs.value == 'week') {
        weekOffset.value = -1
        createWeekCalendar(weekOffset.value)

        // 初始化对应周的每一天
        week.value.forEach((weekDay) => {
            initializeDroppedItems(weekDay)
        });
    }
}

const next = () => {
    if (nowIs.value == 'day') {
        const nextDay = day.value.add(1, 'day'); // 增加一天
        day.value = nextDay

        // 初始化对应日期的结构
        initializeDroppedItems(nextDay)
    }
    else if (nowIs.value == 'week') {
        weekOffset.value = 1
        createWeekCalendar(weekOffset.value)

        // 初始化对应周的每一天
        week.value.forEach((weekDay) => {
            initializeDroppedItems(weekDay)
        });
    }
}

const changeToWeek = () => {
    nowIs.value = 'week'
    createWeekCalendar()

    // 初始化當前週的所有日期資料結構
    week.value.forEach((dateKey) => {
        initializeDroppedItems(dateKey);
    });
}
const changeToDay = () => {
    nowIs.value = 'day'
    day.value = day.value.startOf('week')

    // 初始化當前日期資料結構
    initializeDroppedItems(day.value);
}

// 更新影厅
const updateAuditorium = () => {
    nowAuditorium.value = nowStore.value?.auditoriums[0] || null; // 选择第一个影厅
};

// 用于判断某个时间段是否需要隐藏（即已被合并）：
const isHiddenSlot = (dateKey, time) => {
    const storeKey = nowStore.value.id;
    const auditoriumKey = nowAuditorium.value.id;

    initializeDroppedItems(dateKey, time);

    const items = droppedItems[storeKey]?.[auditoriumKey]?.[dateKey]?.[time];
    if (items && items.length > 0 && items[0].rowSpan > 1) {
        return false; // 当前时间段显示
    }

    const currentIndex = timeSlots.value.findIndex(
    (t) => t === time
);
    const checkedSlots = new Set();

for (let i = currentIndex - 1; i >= 0; i--) {
    const prevTime = timeSlots.value[i];
    if (checkedSlots.has(prevTime)) continue; // 如果已经检查过，跳过
    checkedSlots.add(prevTime);
    
    const prevItems = droppedItems[storeKey]?.[auditoriumKey]?.[dateKey]?.[prevTime];
    console.log(`Checking ${prevTime}, Items:`, prevItems);

    if (prevItems && prevItems.length > 0) {
        const { rowSpan } = prevItems[0];
        console.log(`RowSpan: ${rowSpan}, Difference: ${currentIndex - i}`);
        if (rowSpan >= currentIndex - i) {
            console.log(`Time slot ${time} is hidden by ${prevTime}`);
            return true; // 当前时间段被覆盖
        }
    }
}
    return false; // 顯示當前時間段

}

// 获取 rowSpan
const getRowSpan = (dateKey, time) => {
    const storeKey = nowStore.value.id;
    const auditoriumKey = nowAuditorium.value.id;

    initializeDroppedItems(dateKey, time);

    const items = droppedItems[storeKey]?.[auditoriumKey]?.[dateKey]?.[time];
    
    if (items && items.length > 0) {
        return items[0].rowSpan || 1; // 返回存储的 rowSpan 值，默认为 1
    }
    return 1; // 默认情况下，每个时间段占 1 行
}

// 拖拽开始处理
const handleDragStart = (movie, dateKey = null, time = null) => {
    currentDraggedItem.value = movie; // 存储当前拖拽的图片
    if(dateKey != null && time != null) {
        dragInTimeSlot.value.push({
            dateKey,
            time
        })        
    }
};

// 拖拽放置处理
const handleDrop = (date, time) => {
    if (currentDraggedItem.value) {
        const storeKey = nowStore.value.id; // 当前影城ID
        const auditoriumKey = nowAuditorium.value.id; // 当前影厅ID
        const dateKey = date; // 日期作为键
        
        // 確保結構已初始化
        initializeDroppedItems(dateKey, time)
        
        // 计算电影所需的 rowSpan
        const slotDuration = 120; // 每个时间段的时长 (分钟)
        const rowSpan = Math.ceil(currentDraggedItem.value.time / slotDuration);
        
        // 将拖放的电影添加到特定位置
        // 拖放的电影從原本排程上來的        
        if(dragInTimeSlot.value.length != 0) {        
            const { dateKey: prevDateKey, time: prevTime } = dragInTimeSlot.value[0];
            const prevItems = droppedItems[storeKey][auditoriumKey][prevDateKey][prevTime];
            
            initializeDroppedItems(prevDateKey, prevTime);

            if (prevItems?.length > 0) {
                // 删除原位置的电影
                droppedItems[storeKey][auditoriumKey][prevDateKey][prevTime] = [];
                // 交換
                if(droppedItems[storeKey][auditoriumKey][dateKey][time].length != 0) {
                    droppedItems[storeKey][auditoriumKey][prevDateKey][prevTime].push(droppedItems[storeKey][auditoriumKey][dateKey][time][0])
                }
            }
        } 

        // 原本已經有電影
        if(droppedItems[storeKey][auditoriumKey][dateKey][time].length != 0) {
            droppedItems[storeKey][auditoriumKey][dateKey][time][0] = {
                ...currentDraggedItem.value,
                rowSpan
            }
        } else {
            droppedItems[storeKey][auditoriumKey][dateKey][time].push({
                ...currentDraggedItem.value,
                rowSpan
            });
        }        

        // // 隐藏后续被合并的时间段
        for (let i = 1; i < rowSpan; i++) {
            const nextTimeIndex = timeSlots.value.indexOf(time) + i;
            if (nextTimeIndex < timeSlots.value.length) {
                const nextTime = timeSlots.value[nextTimeIndex];
                initializeDroppedItems(dateKey, nextTime);
                droppedItems[storeKey][auditoriumKey][dateKey][nextTime] = []; // 清空合并范围内的时间段
            }
        }        
        console.log("Dropped Items Updated:", droppedItems);

        // 清空当前拖拽数据
        currentDraggedItem.value = null;
        dragInTimeSlot.value = [];
    }
    console.log("Dropped Items:", JSON.stringify(droppedItems, null, 2));

};

// 清空為儲存進資料庫的電影排程資料
const clearInputSchedule = () => {
    const storeKey = nowStore.value.id; // 当前影城ID
    const auditoriumKey = nowAuditorium.value.id; // 当前影厅ID

    // 清空当前影厅的所有数据
    if (droppedItems[storeKey]?.[auditoriumKey]) {
        droppedItems[storeKey][auditoriumKey] = {};
    }
    console.log(`Cleared schedule for Store: ${nowStore.value.name}, Auditorium: ${nowAuditorium.value.name}`);

}

onMounted(() => {
    init()
})

// 监听商店变化，自动更新影厅
watch(nowStore, (newStore) => {
    nowAuditorium.value = newStore?.auditoriums[0] || null; // 自动选中新商店的第一个影厅
});

</script>

<style scoped>
/* 主容器样式 */
.calendar-container {
    max-width: 900px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* 视图切换按钮 */
.view-switch {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
}

.btn-primary {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.btn-secondary {
    background-color: #6c757d;
    color: #fff;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.btn-secondary:hover {
    background-color: #5a6268;
}

/* 时间段与排程容器 */
.day {
    display: grid;
    grid-template-columns: 80px auto;
    /* 左侧时间段宽度 + 右侧排程宽度 */
    gap: 10px;
    border: 1px solid #007bff;
    padding: 10px;
    border-radius: 8px;
    background-color: #f8f9fa;
}

/* 时间段列 */
.time-column {
    display: grid;
    grid-template-rows: repeat(auto-fill, 40px);
    /* 每个时间段固定高度 */
    border-right: 1px solid #ddd;
    text-align: center;
}

.time-slot {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    font-size: 14px;
    color: #333;
}

/* 日视图 */
.schedule-column {
    display: grid;
    grid-template-rows: auto repeat(auto-fill, 40px);
    /* 日期头部 + 时间格子 */
}

.date-header {
    font-weight: bold;
    text-align: center;
    background-color: #007bff;
    color: #fff;
    padding: 5px;
    border-radius: 4px;
}

/* 周视图 */
.schedule-week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    /* 一周7天均分宽度 */
    gap: 5px;
}

.day-column {
    display: grid;
    grid-template-rows: auto repeat(auto-fill, 40px);
    /* 日期头部 + 时间格子 */
    text-align: center;
    border-left: 1px solid #ddd;
}

.schedule-item {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ddd;
    height: 40px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: #333;
}

.dropped-item {
    width: 100%;
    /* 占满父容器 */
    height: 100%;
    /* 占满父容器 */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    position: relative;
    /* 为图片提供定位基础 */

}

.dropped-item img {
    width: 20px;
    /* 图片宽度为父元素宽度 */
    height: auto;
    /* 保持图片比例 */
    object-fit: contain;
    /* 防止图片被拉伸 */
    border-radius: 4px;
    border: 1px solid #ddd;
}

.dropped-item span {
    font-size: 12px;
    color: #333;
    text-align: center;
}

.schedule-item:hover {
    background-color: #e9ecef;
}

/* 底部导航按钮 */
.navigation {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
}

img {
    max-width: 100px;
}
</style>
