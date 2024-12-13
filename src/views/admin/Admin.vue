<template>
    <div>
        <h3>用戶列表</h3>
        <div class="row">
            <div class="col-5">
                <input type="text" placeholder="用戶查詢" v-model="findName" @input="fetchAdmins(1)">
            </div>
            <div class="col-4">
                <UserSelect :options="[5, 10, 20, 50]"
                        :total="total" v-model="rows" @change="fetchAdmins(1)">
                </UserSelect>
            </div>
        </div>
        <br>
        
        <div class="row">
            <div class="col-6" v-show="total>0">
                <Paginate 
                    v-model="current"    
                    :page-count="pages"
                    :click-handler="fetchAdmins"
                    :initial-page="current"
                    :first-last-button="true"
                    first-button-text="&lt;&lt;"
                    last-button-text="&gt;&gt;"
                    prev-text="&lt;"
                    next-text="&gt;">
                </Paginate>
            </div>
        </div>
        <br>

        <table>
            <thead>
                <tr>
                    <th>Account</th>
                    <th>Birth Date</th>
                    <th>Email</th>
                    <th>Phone No</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.account }}</td>
                    <td>{{ user.birthDate }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.phoneNo }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axiosapi from "@/plugins/axios.js";
import Paginate from 'vuejs-paginate-next';
import UserSelect from "@/components/UserSelect.vue";

export default {
    components: {
        Paginate,
        UserSelect
    },

    data() {
        return {
            users: [],
            findName: "",
            start: 0,
            rows: 10,
            current: 1,
            pages: 0,
            total: 0,
            lastPageRows: 0
        };
    },

    created() {
        this.fetchAdmins();
    },

    methods: {
        async fetchAdmins(page = 1) {
            try {
                this.current = page;
                this.start = (page - 1) * this.rows;
                if (this.findName === "") {
                    this.findName = null;
                }
                const request = {
                    start: this.start,
                    max: this.rows,
                    dir: false,
                    order: "id",
                    account: this.findName
                };
                const response = await axiosapi.post('http://localhost:8080/admin/find', request);
                
                this.users = response.data.list;
                this.total = response.data.count;
                this.pages = Math.ceil(this.total / this.rows);
                this.lastPageRows = this.total % this.rows;
            } catch (error) {
                console.error('Error fetching admin data:', error);
            }
        }
    }
};
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 18px;
    font-family: 'Arial', sans-serif;
    min-width: 400px;
}

th,
td {
    border: 1px solid #ddd;
    padding: 12px 15px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
    color: #333;
    font-weight: bold;
}

tr {
    border-bottom: 1px solid #ddd;
}

tr:nth-of-type(even) {
    background-color: #f9f9f9;
}

tr:hover {
    background-color: #f1f1f1;
}

@media (max-width: 600px) {
    table {
        font-size: 14px;
    }

    th,
    td {
        padding: 10px 8px;
    }
}
</style>