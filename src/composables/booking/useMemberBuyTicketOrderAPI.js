import { createOrder, updateOrderStatus } from "@/api/booking/memberBuyTicketOrderAPI.js";
import { reactive, ref } from "vue";

export function useMemberBuyTicketOrderAPI() {
    const order = ref(null)
    const orderList = reactive({data: []})

    const newOrder = async (requestMemberBuyTicketOrder) => {
        try {
            order.data = (await createOrder(requestMemberBuyTicketOrder)).data.data                     
        } catch (error) {
            console.error("Error fetching order data:", error);
            throw error; // 抛出错误以便组件处理
        }
    }

    const changeOrderStatus = async (request) => {
        try {
            order.data = (await updateOrderStatus(request)).data.data                     
        } catch (error) {
            console.error("Error fetching order data:", error);
            throw error; // 抛出错误以便组件处理
        }
    }
    
    return {
        order,
        newOrder,
        changeOrderStatus,
    }
}