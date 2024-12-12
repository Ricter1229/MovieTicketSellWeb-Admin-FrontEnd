<template>
    <div class="container">
        <div>
            <div class="screen">螢幕</div>
            <div class="seat-container">
                <div class="seat-list">
                    <div v-for="row in rows" :key="row" class="row">
                        <div v-for="col in columns" :key="col" class="seat" @click="toggleSeat(row, col)">
                            <div v-if="isVisible(row, col)" >{{ `${row}-${col}` }}</div>
                        </div>
                    </div>
                </div>
                <!-- 行号 -->
                <div class="row-numbers">
                    <button v-for="row in rows" :key="row" @click="toggleRow(row)"
                        :class="['btn', isRowVisible(row) ? 'btn-primary' : 'btn-hidden']">
                        {{ row }}
                    </button>
                </div>
            </div>
            <!-- 列号 -->
            <div class="column-numbers">
                <button v-for="col in columns" :key="col" @click="toggleColumn(col)"
                    :class="['btn', isColumnVisible(col) ? 'btn-primary' : 'btn-hidden']">
                    {{ col }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';

const x = 10; // 行数
const y = 10; // 列数
const rows = Array.from({ length: x }, (_, i) => i + 1);
const columns = Array.from({ length: y }, (_, i) => i + 1);

// 使用 Map 存储每个格子的可见状态
const seatVisibility = reactive(new Map());

// 初始化所有格子为可见
const initializeVisibility = () => {
    for (let row of rows) {
        for (let col of columns) {
            seatVisibility.set(`${row}-${col}`, true); // 默认所有格子可见
        }
    }
};

// 检查某个格子是否可见
const isVisible = (row, col) => seatVisibility.get(`${row}-${col}`);

const toggleSeat = (row, col) => {
    const currentState = isVisible(row, col)
    const key = `${row}-${col}`;
    seatVisibility.set(key, !currentState);
}

// 切换某一行的可见性
const toggleRow = (row) => {
    const currentState = isRowVisible(row);
    for (let col of columns) {
        const key = `${row}-${col}`;
        seatVisibility.set(key, !currentState); // 将所有格子的状态设置为相同
    }
};

// 检查某一行是否可见
const isRowVisible = (row) => {
    return columns.some((col) => seatVisibility.get(`${row}-${col}`)); // 如果行中有一个格子可见，则行可见
};

// 切换某一列的可见性
const toggleColumn = (col) => {
    const currentState = isColumnVisible(col);
    for (let row of rows) {
        const key = `${row}-${col}`;
        seatVisibility.set(key, !currentState); // 将所有格子的状态设置为相同
    }
};

// 检查某一列是否可见
const isColumnVisible = (col) => {
    return rows.some((row) => seatVisibility.get(`${row}-${col}`)); // 如果列中有一个格子可见，则列可见
};

// 初始化格子可见状态
initializeVisibility();
</script>



<style scoped>
.container {
    text-align: center;
    margin: 20px;
}

.screen {
    border: 1px dotted blue;
    text-align: center;
    font-size: 2em;
    margin-bottom: 10px;
    padding: 5px;
}

.seat-container {
    display: flex;
    position: relative;
}

.seat-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    /* 容器宽度 */
    height: 70vh;
    /* 容器高度 */
    border: 1px dotted purple;
    overflow-y: auto;
    /* 支持滚动 */
}

.row {
    display: flex;
    flex: 1;
    /* 每一行平分可用高度 */
    justify-content: center;
    /* 居中排列 */
}

.seat {
    flex: 1;
    /* 每个座位在行内平分宽度 */
    margin: 2px;
    /* 座位之间的间距 */
    background-color: beige;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    font-size: 0.8em;
    cursor: pointer;
    /* 鼠标效果 */
    user-select: none;
    /* 禁止文字选中 */
    transition: background-color 0.3s;
}

.seat:hover {
    background-color: lightgreen;
}

/* 行号显示 */
.row-numbers {
    display: flex;
    flex-direction: column;
    margin-left: 5px;
    height: 70vh;
    /* 与座位区高度一致 */
    overflow-y: auto;
    /* 同步滚动支持 */
}

.column-numbers {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 5px;
}

/* 按钮样式 */
.btn {
    width: 50px;
    height: 40px;
    margin: 5px;
    border: 1px solid black;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-primary {
    background-color: lightblue;
    color: black;
}

.btn-hidden {
    background-color: white;
    color: black;
    border: 1px solid gray;
}
</style>
