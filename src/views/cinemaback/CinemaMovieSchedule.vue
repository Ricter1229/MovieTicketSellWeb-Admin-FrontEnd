<template>

    <table class="table table-dark table-striped">
        <tbody>
            <tr>
                <td>
                    <form>
                        <section class="movie">
                            <button type="button" class="btn btn-light" @click="editFunction(0)" v-if="edits[0]==false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                </svg>
                            </button>
                            <button type="button" class="btn btn-danger" v-if="edits[0]==true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </button>
                            <img src="@/assets/images/film_20241104004.jpg" alt="" class="movie_img">
                            <section class="checks">
                                <h2>title</h2>
                                <section class="schedule_times">
                                    <section class="schedule_time" v-for="(date, index) in dates" :key="index">
                                        <h3>{{date}}</h3>
                                        <section class="check">
                                            <input type="checkbox" name="schedule" value="0:00-2:00">
                                            <label for="schedule" >0:00-2:00</label>
                                        </section>
                                        <section class="check">
                                            <input type="checkbox" name="schedule" value="2:00-4:00">
                                            <label for="schedule" >2:00-4:00</label>
                                        </section>
                                        <section class="check">
                                            <input type="checkbox" name="schedule" value="4:00-6:00">
                                            <label for="schedule" >4:00-6:00</label>
                                        </section>
                                        <section class="check">
                                            <input type="checkbox" name="schedule" value="8:00-10:00">
                                            <label for="schedule" >8:00-10:00</label>
                                        </section>
                                        <section class="check">
                                            <input type="checkbox" name="schedule" value="12:00-14:00">
                                            <label for="schedule" >12:00-14:00</label>
                                        </section>
                                        <section class="check">
                                            <input type="checkbox" name="schedule" value="14:00-16:00">
                                            <label for="schedule" >14:00-16:00</label>
                                        </section>
                                        <section class="check">
                                            <input type="checkbox" name="schedule" value="16:00-18:00">
                                            <label for="schedule" >16:00-18:00</label>
                                        </section>
                                        <section class="check">
                                            <input type="checkbox" name="schedule" value="20:00-22:00">
                                            <label for="schedule" >20:00-22:00</label>
                                        </section>
                                        <section class="check">
                                            <input type="checkbox" name="schedule" value="22:00-0:00">
                                            <label for="schedule" >22:00-0:00</label>
                                        </section>
                                    </section>
                                </section>
                            </section>
                            <button type="button" class="btn btn-light" v-if="edits[0]==true" @click="submitFunction(0)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
                                    <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0"/>
                                    <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708"/>
                                </svg>
                            </button>
                        </section>
                    </form>
                </td>
            </tr>
            <tr>
                <td>
                    <form>
                        <section class="movie">
                            <button type="button" class="btn btn-light" @click="editFunction(1)" v-if="edits[1]==false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                </svg>
                            </button>
                            <button type="button" class="btn btn-danger" v-if="edits[1]==true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </button>
                            <img src="@/assets/images/film_20241104004.jpg" alt="" class="movie_img">
                            <section class="checks">
                                <h2>title</h2>
                                <section class="schedule_times">
                                    <section class="schedule_time" v-for="(date, index) in dates" :key="index">
                                        <h3>{{date}}</h3>
                                        <section class="check">
                                            <input type="checkbox" name="schedule" value="0:00-2:00">
                                            <label for="schedule" >0:00-2:00</label>
                                        </section>
                                        <section class="check">
                                            <input type="checkbox" name="schedule" value="2:00-4:00">
                                            <label for="schedule" >2:00-4:00</label>
                                        </section>
                                        <section class="check">
                                            <input type="checkbox" name="schedule" value="4:00-6:00">
                                            <label for="schedule" >4:00-6:00</label>
                                        </section>
                                        <section class="check">
                                            <input type="checkbox" name="schedule" value="8:00-10:00">
                                            <label for="schedule" >8:00-10:00</label>
                                        </section>
                                        <section class="check">
                                            <input type="checkbox" name="schedule" value="12:00-14:00">
                                            <label for="schedule" >12:00-14:00</label>
                                        </section>
                                        <section class="check">
                                            <input type="checkbox" name="schedule" value="14:00-16:00">
                                            <label for="schedule" >14:00-16:00</label>
                                        </section>
                                        <section class="check">
                                            <input type="checkbox" name="schedule" value="16:00-18:00">
                                            <label for="schedule" >16:00-18:00</label>
                                        </section>
                                        <section class="check">
                                            <input type="checkbox" name="schedule" value="20:00-22:00">
                                            <label for="schedule" >20:00-22:00</label>
                                        </section>
                                        <section class="check">
                                            <input type="checkbox" name="schedule" value="22:00-0:00">
                                            <label for="schedule" >22:00-0:00</label>
                                        </section>
                                    </section>
                                </section>
                            </section>
                            <button type="button" class="btn btn-light" v-if="edits[1]==true" @click="submitFunction(1)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
                                    <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0"/>
                                    <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708"/>
                                </svg>
                            </button>
                        </section>
                    </form>
                </td>
            </tr>
        </tbody>
    </table>
</template>
    
<script setup>
    import { ref } from 'vue';

    const edits = ref([false, false]);
// 定義星期的映射
const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

const getWednesdayDates = () => {
    const currentWednesday = new Date();
    if(currentWednesday.getDay()<3){
    currentWednesday.setDate(currentWednesday.getDate()-(currentWednesday.getDay()+4))
    }else{

        currentWednesday.setDate(
        currentWednesday.getDate() + ((3 - currentWednesday.getDay() + 7) % 7)
       
      ); // 計算本周三的日期
    }
    console.log(currentWednesday.getDay());
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(currentWednesday);
        date.setDate(currentWednesday.getDate() + i);

        // 格式化為 yyyy-MM-dd(星期)
        const formattedDate = `${date.toISOString().split('T')[0]}(${weekdays[date.getDay()]})`;
        dates.push(formattedDate);
    }
    return dates;
};

// 使用 ref 將結果設為響應式
const dates = ref(getWednesdayDates());

function editFunction(index){
    edits.value[index] = true;
}
function submitFunction(index){
    edits.value[index] = false;
}
</script>
    
<style scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    h2{
        margin-left: 10px;
        margin-top: 15px;
        font-size: 22px;
    }
    h3{
        font-size: 18px;
    }
    .movie{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .movie_img{
        width: 150px;
        height: 210px;
        margin-right: 20px;
        
    }
    .schedule_times{
        display: flex;
        flex-wrap: wrap;
    }
    .schedule_time{
        margin: 10px;
    }
    .check{
        margin: 5px;
    }
    .btn{
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        vertical-align: middle;
        margin: 60px;
    }

</style>