<template>
    <div class="d-flex-main">
        <section class="main">

            <!-- 日曆 -->
            <div class="calendar-container">
                <div style="display: flex;">
                    <!-- 影城、影廳切換下拉選單 -->
                    <div class="sl-flex" style="flex-grow: 1;">
                        <!--  -->
                        <div class="form-floating sl-left">
                            <select class="form-select" id="floatingSelect" aria-label="Floating label select example" v-model="nowStore">
                                <option v-for="store in stores" :key="store.id" :value="store">{{ store.name }}</option>
                            </select>
                            <label for="floatingSelect">影城名稱</label>
                        </div>
                        <!--  -->
                        <!-- <div>
                            <select v-model="nowStore">
                                <option v-for="store in stores" :key="store.id" :value="store">{{ store.name }}</option>
                            </select>
                        </div> -->

                        <!--  -->
                        <div class="form-floating sl-aud">
                            <select class="form-select" id="floatingSelect" aria-label="Floating label select example" v-if="auditoriums" v-model="nowAuditorium">
                                <option  v-for="auditorium in auditoriums" :key="auditorium.id" :value="auditorium">{{ auditorium.name }}</option>
                            </select>
                            <label for="floatingSelect">影廳名稱</label>
                        </div>
                        <!--  -->
                        <!-- <div>
                            <select v-if="auditoriums" v-model="nowAuditorium">
                                <option v-for="auditorium in auditoriums" :key="auditorium.id" :value="auditorium">
                                    {{ auditorium.name }}</option>
                            </select>
                        </div> -->
                    </div>
    
                    <!-- 存檔 清空按鈕 -->
                    <div class="btns">
                        <button @click="saveToDB" class="btn btn-outline-success">存檔</button>
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
                        <div v-for="time in timeSlots" :key="time">
                            <div class="schedule-item" @dragover.prevent
                                @drop="handleDrop(formattedDayToYearMonthDay(day), time)">
                                <div v-for="item in (droppedItems[nowStore.storeId]?.[nowAuditorium.id]?.[formattedDayToYearMonthDay(day)]?.[time] || [])"
                                    :key="item.id" class="dropped-item d-flex" draggable="true"
                                    @dragstart="handleDragStart(item, formattedDayToYearMonthDay(day), time)">
                                    <span @dblclick="remove(formattedDayToYearMonthDay(day), time)">{{
                                        item.movie.chineseName }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <!-- 周视图 -->
                    <div v-else class="schedule-week">
                        <div class="day-column" v-for="day in week" :key="day">
                            <div class="date-header">{{ day.format("MM-DD(dd)") }}</div>
                            <div v-for="time in timeSlots" :key="time" class="schedule-item" @dragover.prevent
                                @drop="handleDrop(formattedDayToYearMonthDay(day), time)">
                                <div v-for="item in (droppedItems[nowStore.storeId]?.[nowAuditorium.id]?.[formattedDayToYearMonthDay(day)]?.[time] || [])"
                                    :key="item.id" class="dropped-item d-flex" draggable="true"
                                    @dragstart="handleDragStart(item, formattedDayToYearMonthDay(day), time)">
                                    <span @dblclick="remove(formattedDayToYearMonthDay(day), time)">{{
                                        item.movie.chineseName }}</span>
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
    
    
            
            <hr>
            <!-- 影城提供的電影列表 -->
            <div class="card text-bg-secondary mb-3" >
                <div class="card-header">
                    <section class="sl-section">
                        <div class="form-floating sl">
                            <select class="form-select version-right" id="floatingSelect" aria-label="Floating label select example" v-model="selectedVersionId" @change="getMovie">
                                <option v-for="version in versions" :key="version.id" :value="version.id"> {{ version.version }}</option>
                            </select>
                            <label for="floatingSelect">電影版本</label>
                        </div>
                    </section>
                    <!-- <select v-model="selectedVersionId" @change="getMovie">
                    <option v-for="version in versions" :key="version.id" :value="version.id">
                        {{ version.version }}
                    </option>
                    </select> -->
                    <div class="provide-movie">
                        {{ nowStore.name }} 提供的電影
                    </div>
                </div>
                <div class="card-body-outer">
                    <div v-if="nowStore" v-for="movie in movies" :key="movie.movie.id" class="d-flex" calss="card w-75 mb-3">
                    <div class="card-body-inner" draggable="true" @dragstart="handleDragStart(movie)">
                        <div class="card-text" >
                            <img :src="movie.mainPhoto" :alt="movie.movie.chineseName">
                            <div class="card-title">{{ movie.movie.chineseName }}</div>
                            <!-- <div>{{ movie.movie.runTime }}分鐘</div> -->
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <!-- <div style="border: 1px solid red;">
                <select v-model="selectedVersionId" @change="getMovie">
                    <option v-for="version in versions" :key="version.id" :value="version.id">
                        {{ version.version }}
                    </option>
                </select>
                <div>
                    {{ nowStore.name }} 提供的電影
                </div>
                <div v-if="nowStore" v-for="movie in movies" :key="movie.movie.id" class="d-flex" calss="card w-75 mb-3">
                    <div class="card-body" draggable="true" @dragstart="handleDragStart(movie)">
                        <div card-text>
                            <img :src="movie.mainPhoto" :alt="movie.movie.chineseName">
                            <div class="card-title">{{ movie.movie.chineseName }}</div> -->
                            <!-- <div>{{ movie.movie.runTime }}分鐘</div> -->
                        <!-- </div>
                    </div>
                </div>
            </div> -->
        </section>
        
    </div>
</template>


<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'; // 引入中文语言包
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import axiosInstance from '@/utils/axiosInstance';
import Swal from 'sweetalert2';
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

const stores = ref([])
const auditoriums = ref([])
const movies = ref([])
const versions = ref([])
const selectedVersionId = ref(1)
const nowStore = ref([]); // 默认选中第一个商店
const nowAuditorium = ref(null); // 默认选中第一个商店的第一个影厅
const removeForDB = new Map()
let dataFromDB;

const formattedDayToYearMonthDay = date => {
    return dayjs(date).format("YYYY-MM-DD")
}

const init = () => {
    nowIs.value = 'day'

    getStore()
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

const getStore = async () => {
    const request = {}
    const response = await axiosInstance.post('/store/find', request)
    stores.value = response.data.list
    nowStore.value = stores.value[0]
    getAuditorium()
    getVersion()

}

const getAuditorium = async () => {
    const request = {
        storeId: nowStore.value?.storeId
    }
    const response = await axiosInstance.post('/api/Auditorium/getAll', request)
    auditoriums.value = response.data.data
    nowAuditorium.value = auditoriums.value[0]
}

const getMovie = async () => {
    const request = {
        storeId: nowStore.value?.storeId,
        versionId: selectedVersionId.value
    }
    const response = await axiosInstance.post('/api/store-release-movie/all-with-storeid-versionid', request)
    movies.value = response.data.data

    for (let i = 0; i < movies.value?.length; i++) {
        movies.value[i].mainPhoto = movies.value[i].movie.mimeType + movies.value[i].movie.photo
    }
    loadSchedule()
}

const getVersion = async () => {
    const request = {
        storeId: nowStore.value?.storeId,
    }
    const response = await axiosInstance.post('/api/store-release-movie/get-versions',request);
    const temp = response.data.data;
    console.log(temp[0]);
    versions.value = temp
    console.log(versions.value);
    
    selectedVersionId.value = versions.value[0]?.id;
    getMovie()

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
        // week.value.push(currentTime.format("MM-DD(dd)"));
        week.value.push(currentTime);
        currentTime = currentTime.add(1, "day");
    }

    week.value.forEach((weekDay) => {
        initializeDroppedItems(weekDay)
    });
}

// 初始化对应日期的结构
const initializeDroppedItems = (dateKey, time = null) => {
    const storeKey = nowStore.value?.storeId; // 當前影城ID
    const auditoriumKey = nowAuditorium.value.id; // 當前影廳ID
    dateKey = dayjs(dateKey).format("YYYY-MM-DD")

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
    loadSchedule()
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
    loadSchedule()
}

const changeToWeek = () => {
    if (nowIs.value === 'week')
        return
    nowIs.value = 'week'
    createWeekCalendar()
    console.log(droppedItems);

    // 初始化當前週的所有日期資料結構
    week.value.forEach((dateKey) => {
        initializeDroppedItems(dateKey);
    });
    loadSchedule()
}
const changeToDay = () => {
    if (nowIs.value === 'day')
        return
    nowIs.value = 'day'
    day.value = day.value.startOf('week')
    console.log(droppedItems);

    // 初始化當前日期資料結構
    initializeDroppedItems(day.value);
    loadSchedule()
}

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
    if (dateKey != null && time != null) {
        dragInTimeSlot.value.push({
            dateKey,
            time
        })
    }
};

// 拖拽放置处理
const handleDrop = (date, time) => {
    if (currentDraggedItem.value) {
        const storeKey = nowStore.value.storeId; // 当前影城ID
        const auditoriumKey = nowAuditorium.value.id; // 当前影厅ID
        const dateKey = date; // 日期作为键

        // 確保結構已初始化
        initializeDroppedItems(dateKey, time)

        // 计算电影所需的 rowSpan
        const slotDuration = 120; // 每个时间段的时长 (分钟)
        const rowSpan = Math.ceil(currentDraggedItem.value.time / slotDuration);

        // 将拖放的电影添加到特定位置
        // 拖放的电影從原本排程上來的        
        if (dragInTimeSlot.value.length != 0) {
            const { dateKey: prevDateKey, time: prevTime } = dragInTimeSlot.value[0];
            const prevItems = [...(droppedItems[storeKey][auditoriumKey][prevDateKey][prevTime] || [])]; // 创建数组副本
            const currentItems = [...(droppedItems[storeKey][auditoriumKey][dateKey][time] || [])]; // 当前时间段的副本

            initializeDroppedItems(prevDateKey, prevTime);
            initializeDroppedItems(dateKey, time);

            if (prevItems.length > 0 && currentItems.length > 0) {
                initializeDroppedItems(prevDateKey, prevTime)
                // 交换数据
                droppedItems[storeKey][auditoriumKey][dateKey][time] = prevItems; // 将之前的时间段数据放到当前时间段
                droppedItems[storeKey][auditoriumKey][prevDateKey][prevTime] = currentItems; // 将当前时间段数据放到之前的时间段
            } else {
                droppedItems[storeKey][auditoriumKey][dateKey][time] = prevItems; // 将之前的时间段数据放到当前时间段
                delete droppedItems[storeKey][auditoriumKey][prevDateKey][prevTime]
            }
        } else {
            if (droppedItems[storeKey][auditoriumKey][dateKey][time].length != 0) {
                // 原本已經有電影
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
        }


        // // 隐藏后续被合并的时间段
        // for (let i = 1; i < rowSpan; i++) {
        //     const nextTimeIndex = timeSlots.value.indexOf(time) + i;
        //     if (nextTimeIndex < timeSlots.value.length) {
        //         const nextTime = timeSlots.value[nextTimeIndex];
        //         initializeDroppedItems(dateKey, nextTime);
        //         droppedItems[storeKey][auditoriumKey][dateKey][nextTime] = []; // 清空合并范围内的时间段
        //     }
        // }        
        // console.log("Dropped Items Updated:", droppedItems);

        // 清空当前拖拽数据
        currentDraggedItem.value = null;
        dragInTimeSlot.value = [];
    }
    // console.log("Dropped Items:", JSON.stringify(droppedItems, null, 2));

};

const remove = (date, time) => {
    const storeKey = nowStore.value?.storeId; // 当前影城ID
    const auditoriumKey = nowAuditorium.value.id; // 当前影厅ID
    const storeReleaseMovieId = droppedItems[storeKey][auditoriumKey][date][time][0].storeReleaseMovieId
    delete droppedItems[storeKey][auditoriumKey][date][time];

    const key = `${storeKey}-${auditoriumKey}-${date}-${time}`;
    removeForDB.set(key, { auditoriumKey, date, time, storeReleaseMovieId })
}

// 清空為儲存進資料庫的電影排程資料
const clearInputSchedule = () => {
    const storeKey = nowStore.value.storeId; // 当前影城ID
    const auditoriumKey = nowAuditorium.value.id; // 当前影厅ID

    // 清空当前影厅的所有数据
    if (droppedItems[storeKey]?.[auditoriumKey]) {
        droppedItems[storeKey][auditoriumKey] = {};
    }
    loadSchedule()
}

const saveToDB = async () => {
    const storeKey = nowStore.value?.storeId; // 当前影城ID
    const request = ref({
        storeId: storeKey,
        movies: []
    })


    // 遍历 droppedItems
    if (droppedItems[storeKey]) {
        const auditoriumKeys = Object.keys(droppedItems[storeKey]);

        for (const auditoriumKey of auditoriumKeys) {
            const dateObject = droppedItems[storeKey][auditoriumKey] || {};
            const dbDateObject = dataFromDB[storeKey]?.[auditoriumKey] || {}; // 对应的 dataFromDB

            const dateKeys = Object.keys(dateObject);

            for (const date of dateKeys) {
                const timeObject = dateObject[date] || {};
                const dbTimeObject = dbDateObject[date] || {}; // 对应的时间段

                const timeKeys = Object.keys(timeObject);

                for (const time of timeKeys) {
                    const droppedItem = timeObject[time][0]; // droppedItems 的电影信息
                    const dbItem = dbTimeObject[time]?.[0]; // dataFromDB 的电影信息
                    
                    if (droppedItem && (!dbItem || droppedItem.storeReleaseMovieId !== dbItem.storeReleaseMovieId)) {
                        // droppedItems 有值，且与 dataFromDB 不同，或者 dataFromDB 没值
                        request.value.movies.push({
                            auditoriumId: auditoriumKey,
                            storeReleaseMovieId: droppedItem.storeReleaseMovieId,
                            date: dayjs(date).format("YYYY-MM-DD"),
                            timeSlots: time,
                            isRemove: false,
                        });
                    }
                }
            }
        }
    }
    console.log(request);
    

    // 遍历 dataFromDB 检查 droppedItems 中是否有对应值
    if (dataFromDB[storeKey]) {
        const auditoriumKeys = Object.keys(dataFromDB[storeKey]);

        for (const auditoriumKey of auditoriumKeys) {
            const dateObject = dataFromDB[storeKey][auditoriumKey] || {};
            const droppedDateObject = droppedItems[storeKey]?.[auditoriumKey] || {}; // 对应的 droppedItems

            const dateKeys = Object.keys(dateObject);

            for (const date of dateKeys) {
                const timeObject = dateObject[date] || {};
                const droppedTimeObject = droppedDateObject[date] || {}; // 对应的时间段

                const timeKeys = Object.keys(timeObject);

                for (const time of timeKeys) {
                    const dbItem = timeObject[time][0]; // dataFromDB 的电影信息
                    const droppedItem = droppedTimeObject[time]?.[0]; // droppedItems 的电影信息
                    
                    if (dbItem && !droppedItem) { 
                        // dataFromDB 有值，但 droppedItems 没值
                        request.value.movies.push({
                            auditoriumId: auditoriumKey,
                            storeReleaseMovieId: dbItem.storeReleaseMovieId,
                            date: dayjs(date).format("YYYY-MM-DD"),
                            timeSlots: time,
                            isRemove: true,
                        });
                    }
                }
            }
        }
    }

    console.log(request.value);

    try {
        await axiosInstance.post('/api/auditorium-schedule/save-store', request.value)
        Swal.fire("保存成功")
    } catch (error) {
        Swal.fire("保存失敗")
    }
}
const loadSchedule = async () => {
    const request = {
        auditoriumId: nowAuditorium.value?.id,
        movies: []
    }

    if (nowIs.value === 'day') {
        const date = dayjs(day.value).format("YYYY-MM-DD")
        request.movies.push({ date: date })
        initializeDroppedItems(date)
    } else {
        week.value.forEach(day => {
            const date = dayjs(day).format("YYYY-MM-DD")
            request.movies.push({ date: date })
            initializeDroppedItems(date)
        })
    }
    const response = await axiosInstance.post('/api/auditorium-schedule/get-auditorium-date', request)
    const tempArray = response.data.data

    const storeKey = nowStore.value?.storeId;
    for (let i = 0; i < tempArray.length; i++) {
        const auditoriumKey = tempArray[i].auditoriumId;
        const dateKey = dayjs(tempArray[i].date).format("YYYY-MM-DD")
        const time = tempArray[i].timeSlots
        const movie = movies.value.find(item => item.storeReleaseMovieId === tempArray[i].storeReleaseMovieId);
        if (movie) {
            initializeDroppedItems(dayjs(tempArray[i].date).format("YYYY-MM-DD"), time)
            if (!droppedItems[storeKey][auditoriumKey][dateKey][time]?.[0]) {
                droppedItems[storeKey][auditoriumKey][dateKey][time].push({
                    ...movie,
                    ...movie.movie
                })
            } else {
                droppedItems[storeKey][auditoriumKey][dateKey][time][0] = {
                    ...movie,
                    ...movie.movie
                }
            }
        }
    }
    dataFromDB = JSON.parse(JSON.stringify(droppedItems));
}

onMounted(() => {
    init()
})

// 监听商店变化，自动更新影厅
watch(nowStore, (newStore) => {
    getAuditorium()
});

watch(nowAuditorium, (nowAuditorium) => {
    loadSchedule()
});
</script>

<style scoped>
/* 主容器样式 */
.d-flex-main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.main{
    display: flex;
}
.calendar-container {
    max-width: 900px;
    margin: 20px;
    padding: 40px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.card{
    margin: 20px;  
    width: 400px;
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
    /* max-width: 100px; */
    width: 130px;
}
.card-body {
    display: flex;
    flex-wrap: wrap;
}
.card-body-outer {
    padding: 20px 25px 20px 25px;
    display: flex;
    flex-wrap: wrap;
}
.card-body-inner {
    margin:  20px;
}
.provide-movie{
    text-align: center;
    margin-top: 20px;
}
.sl-left{
    margin-bottom: 20px;
    margin-right: 20px;
    width: 240px;
}
.sl{
    width: 200px;
}
.sl-section{
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.version-right{
    background-color: rgb(241, 241, 241);

}
.sl-aud{
    width: 100px;
    margin-right: 30px;
}
.sl-flex{
    display: flex;
}
.btn{
    margin-left: 10px;
}
hr{
    border: 2px dashed black;
    margin: 20px 30px 20px 10px;
}
</style>
