import { getSeat } from "@/api/test/seatingAPI";
import { reactive } from "vue";
export function useSeating() {
    const seatingList = reactive({data: null})

    const seatingListRequest = async () => {
        try {
            seatingList.data = (await getSeat()).data;
        } catch (error) {
            console.error("Error fetching seating data:", error);
            throw error; // 抛出错误以便组件处理
        }
    }
    
    return {
        seatingList,
        seatingListRequest
    }
}