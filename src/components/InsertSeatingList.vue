<template>

<div class="container">

<div class="modal" ref="refInsertSeatingListModal" tabindex="-1" id="insertModal0" data-bs-backdrop="static">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">檔案上傳</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <!-- 內容 -->
            <div class="btn-seat btn" @click="saveToDB">存檔</div>
            <div>
                <div class="screen">螢幕</div>
                <div class="seat-container">
                    <div class="seat-list">
                        <div v-for="row in rows" :key="row" class="row">
                            <div v-for="col in columns" :key="col" :class="[seat,isVisible(row, col)?'':'selected']" @click="toggleSeat(row, col)">
                                <div >{{ `${row}-${col}` }}</div>
                            </div>
                        </div>
                    </div>
                    <!-- 列号 -->
                    <div class="row-container">
                        <div class="row-numbers">
                            <button v-for="row in rows" :key="row" @click="toggleRow(row)"
                                :class="['btn-seat btn', isRowVisible(row) ? 'btn-seat-primary' : 'btn-seat-hidden']">
                                {{ row }}
                            </button>
                        </div>
            
                        <input type="number" v-model="x" placeholder="輸入列數" min="1">
                    </div>
                </div>
                <!-- 行号 -->
                <div class="column-container">
                    <div class="column-numbers">
                        <button v-for="col in columns" :key="col" @click="toggleColumn(col)"
                            :class="['btn-seat btn', isColumnVisible(col) ? 'btn-seat-primary' : 'btn-seat-hidden']">
                            {{ col }}
                        </button>
                    </div>
                    <div class="flex-grow"></div>
                    <input type="number" v-model="y" placeholder="輸入行數" min="1">
                </div>
            </div>
            <!-- 输入框动态修改行列数
            <div class="controls">
                <input type="number" v-model="x" placeholder="行數（X）" min="1" />
                <input type="number" v-model="y" placeholder="列數（Y）" min="1" />
                <button @click="saveToDB">保存到数据库</button>
            </div> -->
         
            <!--  -->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="doclick2(receiveCinema.storeId)" v-show="!isShowInsertButton"  :validationFlag="validationFlag">修改</button>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script setup>
import axiosInstance from '@/utils/axiosInstance';
import { reactive, ref, watch,onMounted,nextTick,defineProps } from 'vue';
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js"
const props = defineProps(["cinema"]);
 //modal顯示邏輯
 const refInsertSeatingListModal = ref(null);
    const modal = ref(null);
    

    onMounted(() => {
        nextTick(() => {
            // if (!fileInput.value) {
            //     console.error("fileInput reference is not initialized.");
            // }
            console.log("refInsertSeatingListModal.valuek",refInsertSeatingListModal.value);
            modal.value = new bootstrap.Modal(refInsertSeatingListModal.value);
        });
    })
    function showModal() {
        console.log("modal.value",modal.value);
        modal.value.show();
    }
    function hideModal() {
        modal.value.hide();
    }
    defineExpose({
        showModal, hideModal,
    });

const x = ref(10); // 行数
const y = ref(10); // 列数
const range = ref([x.value, y.value])
const walkwayPositionsX = ref([])
const walkwayPositionsY = ref([])
const nullSeats = ref([])

let rows = Array.from({ length: x.value }, (_, i) => i + 1);
let columns = Array.from({ length: y.value }, (_, i) => i + 1);

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

let checkFromSeat = false
const toggleSeat = (row, col) => {
    const currentState = isVisible(row, col)
    const key = `${row}-${col}`;
    seatVisibility.set(key, !currentState);

    if (isRowEmpty(row)) {
        checkFromSeat = true
        toggleRow(row)
    } else if (isColumnEmpty(col)) {
        checkFromSeat = true
        toggleColumn(col)
    } else {
        if (currentState) {
            if (!nullSeats.value.includes(key)) {
                nullSeats.value.push(key);
            }
        } else {
            nullSeats.value = nullSeats.value.filter((k) => k !== key);
        }
    }

}

// 檢查某行是否完全不可見
const isRowEmpty = (row) => {
    return columns.every((col) => !seatVisibility.get(`${row}-${col}`));
};

// 切換某一行的可見性
const toggleRow = (row) => {
    const currentState = isRowVisible(row);

    // 1. 檢查前一行和後一行是否都為空
    const prevRowEmpty = row > 1 && isRowEmpty(row - 1);
    const nextRowEmpty = row < x.value && isRowEmpty(row + 1);

    // 保存當前所有座位狀態
    const savedSeatState = new Map(seatVisibility);

    // 刪除指定行並重新生成後續行的鍵
    const regenerateKeys = (deletedRow) => {
        const newSeatVisibility = new Map();
        let newRow = 1;

        for (let i = 1; i <= x.value; i++) {
            if (i === deletedRow) continue; // 跳過被刪除的行
            for (let col of columns) {
                const oldKey = `${i}-${col}`;
                const newKey = `${newRow}-${col}`;
                newSeatVisibility.set(newKey, savedSeatState.get(oldKey) || false);
            }
            newRow++;
        }

        // 清空舊 seatVisibility，並重新填充
        seatVisibility.clear();
        for (let [key, value] of newSeatVisibility) {
            seatVisibility.set(key, value);
        }
    };
    let isMuti = false
    if (prevRowEmpty && nextRowEmpty) {
        regenerateKeys(row + 1); // 重新生成鍵並刪除前一行
        regenerateKeys(row - 1); // 重新生成鍵並刪除前一行
        if (walkwayPositionsX.value.includes(row + 1)) {
            walkwayPositionsX.value = walkwayPositionsX.value.filter((r) => r !== row + 1);
        }
        if (walkwayPositionsX.value.includes(row - 1)) {
            walkwayPositionsX.value = walkwayPositionsX.value.filter((r) => r !== row - 1);
        }
        x.value -= 2; // 總行數減少兩行
        isMuti = true
    }

    // 2. 如果只有前一行為空
    else if (prevRowEmpty) {
        regenerateKeys(row - 1); // 重新生成鍵並刪除前一行
        if (walkwayPositionsX.value.includes(row - 1)) {
            walkwayPositionsX.value = walkwayPositionsX.value.filter((r) => r !== row - 1);
        }
        x.value -= 1;
    }

    // 3. 如果只有後一行為空
    else if (nextRowEmpty) {
        regenerateKeys(row); // 重新生成鍵並刪除後一行
        if (walkwayPositionsX.value.includes(row)) {
            walkwayPositionsX.value = walkwayPositionsX.value.filter((r) => r !== row);
        }
        x.value -= 1;
    }
    if (checkFromSeat) {
        for (let i = 1; i <= y.value; i++) {
            for (let col of columns) {
                const key = `${row}-${i}`;
                nullSeats.value = nullSeats.value.filter((k) => k !== key);
            }
        }
    }

    if (row == 1) {
        regenerateKeys(row)
        x.value -= 1
        walkwayPositionsX.value = walkwayPositionsX.value.map((c) => c - 1);
        return
    }
    if (row == x.value) {
        regenerateKeys(row)
        x.value -= 1
        if (walkwayPositionsX.value.includes(row)) {
            walkwayPositionsX.value = walkwayPositionsX.value.filter((c) => c !== row);
        }
        return
    }
    if (!checkFromSeat) {
        for (let col of columns) {
            const key = `${row}-${col}`;
            seatVisibility.set(key, !currentState);
        }
    }
    // 5. 更新 walkwayPositionsX 狀態
    if (currentState || checkFromSeat) {
        if (!walkwayPositionsX.value.includes(row)) {
            walkwayPositionsX.value.push(row);
        }
    } else {
        walkwayPositionsX.value = walkwayPositionsX.value.filter((r) => r !== row);
    }
};

// 检查某一行是否可见
const isRowVisible = (row) => {
    return columns.some((col) => seatVisibility.get(`${row}-${col}`)); // 如果行中有一个格子可见，则行可见
};

// 檢查某列是否完全不可見
const isColumnEmpty = (col) => {
    return rows.every((row) => !seatVisibility.get(`${row}-${col}`));
};

// 切換某一列的可見性
const toggleColumn = (col) => {
    const currentState = isColumnVisible(col);

    // 1. 檢查前一列和後一列是否都為空
    const prevColEmpty = col > 1 && isColumnEmpty(col - 1);
    const nextColEmpty = col < y.value && isColumnEmpty(col + 1);

    // 保存當前所有座位狀態
    const savedSeatState = new Map(seatVisibility);

    // 刪除指定列並重新生成後續列的鍵
    const regenerateKeys = (deletedCol) => {
        const newSeatVisibility = new Map();
        let newCol = 1;

        for (let j = 1; j <= y.value; j++) {
            if (j === deletedCol) continue; // 跳過被刪除的列
            for (let row of rows) {
                const oldKey = `${row}-${j}`;
                const newKey = `${row}-${newCol}`;
                newSeatVisibility.set(newKey, savedSeatState.get(oldKey) || false);
            }
            newCol++;
        }

        // 清空舊 seatVisibility，並重新填充
        seatVisibility.clear();
        for (let [key, value] of newSeatVisibility) {
            seatVisibility.set(key, value);
        }
    };

    let isMuti = false;

    // 1. 如果當前列與前後列都為空
    if (prevColEmpty && nextColEmpty) {
        regenerateKeys(col + 1); // 刪除後一列
        regenerateKeys(col - 1); // 刪除前一列
        if (walkwayPositionsY.value.includes(col + 1)) {
            walkwayPositionsY.value = walkwayPositionsY.value.filter((c) => c !== col + 1);
        }
        if (walkwayPositionsY.value.includes(col - 1)) {
            walkwayPositionsY.value = walkwayPositionsY.value.filter((c) => c !== col - 1);
        }
        y.value -= 2; // 總列數減少兩列
        isMuti = true;
    }

    // 2. 如果只有前一列為空
    else if (prevColEmpty) {
        regenerateKeys(col - 1); // 重新生成鍵並刪除前一列
        if (walkwayPositionsY.value.includes(col - 1)) {
            walkwayPositionsY.value = walkwayPositionsY.value.filter((c) => c !== col - 1);
        }
        y.value -= 1;
    }

    // 3. 如果只有後一列為空
    else if (nextColEmpty) {
        regenerateKeys(col); // 重新生成鍵並刪除後一列
        if (walkwayPositionsY.value.includes(col)) {
            walkwayPositionsY.value = walkwayPositionsY.value.filter((c) => c !== col);
        }
        y.value -= 1;
    }

    if (checkFromSeat) {
        for (let i = 1; i <= x.value; i++) {
            for (let col of columns) {
                const key = `${i}-${col}`;
                nullSeats.value = nullSeats.value.filter((k) => k !== key);
            }
        }
    }

    if (col == 1) {
        regenerateKeys(col)
        y.value -= 1
        walkwayPositionsY.value = walkwayPositionsY.value.map((c) => c - 1);
        return
    }
    if (col == y.value) {
        regenerateKeys(col)
        y.value -= 1
        if (walkwayPositionsY.value.includes(col)) {
            walkwayPositionsY.value = walkwayPositionsY.value.filter((c) => c !== col);
        }
        return
    }
    // 4. 切換當前列的座位狀態
    if (!checkFromSeat) {
        for (let row of rows) {
            const key = `${row}-${col}`;
            seatVisibility.set(key, !currentState);
        }
    }

    // 5. 更新 walkwayPositionsY 狀態
    if (currentState || checkFromSeat) {
        if (!walkwayPositionsY.value.includes(col)) {
            walkwayPositionsY.value.push(col);
        }
    } else {
        walkwayPositionsY.value = walkwayPositionsY.value.filter((c) => c !== col);
    }
};


// 检查某一列是否可见
const isColumnVisible = (col) => {
    return rows.some((row) => seatVisibility.get(`${row}-${col}`)); // 如果列中有一个格子可见，则列可见
};

// 监听行列数变化，动态更新行列数组和可见状态
watch([x, y], ([newX, newY], [oldX, oldY]) => {
    rows = Array.from({ length: newX }, (_, i) => i + 1);
    columns = Array.from({ length: newY }, (_, i) => i + 1);
    range.value = [newX, newY]
    if (newX > oldX) {
        for (let i = oldX + 1; i <= newX; i++) { // 從 oldX+1 到 newX
            for (let col = 1; col <= oldY; col++) { // 遍歷舊的列數
                const key = `${i}-${col}`;
                seatVisibility.set(key, true); // 設置座位可見
            }
        }
    } else {
        // 處理新增範圍的座位：全設為 false
        for (let i = newX + 1; i <= oldX; i++) { // 從 oldX+1 到 newX
            for (let col = 1; col <= oldY; col++) { // 遍歷舊的列數
                const key = `${i}-${col}`;
                seatVisibility.set(key, false); // 設置座位為不可見
                nullSeats.value = nullSeats.value.filter((k) => k !== key);
            }
        }
        // 移除 walkwayPositionsX 中位於該範圍內的行號
        walkwayPositionsX.value = walkwayPositionsX.value.filter((row) => {
            return row < newX + 1 || row > oldX; // 保留不在 [oldX+1, newX] 範圍內的行
        });

        toggleRow(newX + 1)
    }

    if (newY > oldY) {
        for (let i = oldY + 1; i <= newY; i++) { // 從 oldY+1 到 newY
            for (let row = 1; row <= oldY; row++) { // 遍歷舊的列數
                const key = `${row}-${i}`;
                seatVisibility.set(key, true); // 設置座位可見
            }
        }
    } else {
        // 處理新增範圍的座位：全設為 false
        for (let i = newY + 1; i <= oldY; i++) { // 從 oldY+1 到 newY
            for (let row = 1; row <= oldY; row++) { // 遍歷舊的列數
                const key = `${row}-${i}`;
                seatVisibility.set(key, false); // 設置座位為不可見
                nullSeats.value = nullSeats.value.filter((k) => k !== key);
            }
        }

        // 移除 walkwayPositionsY 中位於該範圍內的行號
        walkwayPositionsY.value = walkwayPositionsY.value.filter((col) => {
            return col < newY + 1 || col > oldY; // 保留不在 [oldY+1, newY] 範圍內的行
        });
        toggleColumn(newY + 1)
    }

});

// 初始化格子可见状态
initializeVisibility();

const saveToDB = () => {
    const request = {
        auditoriumId: 1,
        range: range.value,
        walkwayPositionsX: walkwayPositionsX.value,
        walkwayPositionsY: walkwayPositionsY.value,
        nullSeats: nullSeats.value
    }
    console.log(request);
    const response = axiosInstance.post('/api/Auditorium/insertSeatingList', request)
    console.log(response);
    
}
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

.row-container {
    height: 70vh;
}

.column-container {
    display: flex;
    width: 80%
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

.flex-grow {
    flex-grow: 1;
}

/* 按钮样式 */
.btn-seat{
    width: 50px;
    height: 40px;
    margin: 5px;
    border: 1px solid black;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s;
} 

.btn-seat-primary {
    background-color: lightblue;
    color: black;
}

.btn-seat-hidden {
    background-color: white;
    color: black;
    border: 1px solid gray;
}
.selected{
  background-color: gray;
}
</style>
