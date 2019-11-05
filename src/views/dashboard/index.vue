<template>
    <div class="dashboard-container">
        <component :is="currentRole" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import adminDashboard from './admin';
import editorDashboard from './editor';

export default {
    name: 'Dashboard',
    components: { adminDashboard, editorDashboard },
    data() {
        return {
            currentRole: 'adminDashboard'
        };
    },
    computed: {
        ...mapState('user', {
            roles: state => state.roles
        })
    },
    created() {
        if (!this.roles.includes('admin')) {
            this.currentRole = 'editorDashboard';
        }
    }
};
</script>
