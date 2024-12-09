import { getAllTicketType } from "@/api/booking/ticketTypeAPI";
import { reactive } from "vue";

export function useTicketTypeAPI() {
    const ticketTypes = reactive({data: []})

    const getAllTicketTypeRequest = async () => {
        try {
            ticketTypes.data = (await getAllTicketType()).data.data            
        } catch (error) {
            console.error("Error fetching ticket type data:", error);
            throw error; // 抛出错误以便组件处理
        }
    }
    
    return {
        ticketTypes,
        getAllTicketTypeRequest,
    }
}