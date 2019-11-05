<template>
    <el-table :data="list" style="width: 100%;padding-top: 15px;">
        <el-table-column label="Order_No" min-width="200">
            <template slot-scope="scope">
                {{ scope.row.order_no | orderNoFilter }}
            </template>
        </el-table-column>
        <el-table-column label="Price" width="195" align="center">
            <template slot-scope="scope">
                ¥{{ scope.row.price | toThousandFilter }}
            </template>
        </el-table-column>
        <el-table-column label="Status" width="100" align="center">
            <template slot-scope="{ row }">
                <el-tag :type="row.status | statusFilter">
                    {{ row.status }}
                </el-tag>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import dashboardService from '@/api/dashboardService';

export default {
    filters: {
        /**
         * 状态过滤器
         * @param status
         */
        statusFilter(status) {
            const statusMap = {
                success: 'success',
                pending: 'danger'
            };
            return statusMap[status];
        },
        /**
         * 订单编号过滤器
         * @param str
         */
        orderNoFilter(str) {
            return str.substring(0, 30);
        }
    },
    data() {
        return {
            /**
             * 列表
             */
            list: null
        };
    },
    /**
     * 组件创建后执行
     */
    created() {
        this.fetchData();
    },
    methods: {
        /**
         * 抓取数据
         */
        fetchData() {
            dashboardService.getTransactionList().then(response => {
                this.list = response.data.items.slice(0, 8);
            });
        }
    }
};
</script>
