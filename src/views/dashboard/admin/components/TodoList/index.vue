<template>
    <section class="todoapp">
        <!-- header -->
        <header class="header">
            <input class="new-todo" autocomplete="off" placeholder="Todo List" @keyup.enter="addTodo" />
        </header>
        <!-- main section -->
        <section v-show="todos.length" class="main">
            <input
                id="toggle-all"
                :checked="allChecked"
                class="toggle-all"
                type="checkbox"
                @change="toggleAll({ done: !allChecked })"
            />
            <label for="toggle-all" />
            <ul class="todo-list">
                <todo
                    v-for="(todo, index) in filteredTodos"
                    :key="index"
                    :todo="todo"
                    @toggleTodo="toggleTodo"
                    @editTodo="editTodo"
                    @deleteTodo="deleteTodo"
                />
            </ul>
        </section>
        <!-- footer -->
        <footer v-show="todos.length" class="footer">
            <span class="todo-count">
                <strong>{{ remaining }}</strong>
                {{ remaining | pluralize('item') }} left
            </span>
            <ul class="filters">
                <li v-for="(val, key) in filters" :key="key">
                    <a :class="{ selected: visibility === key }" @click.prevent="visibility = key">{{
                        key | capitalize
                    }}</a>
                </li>
            </ul>
            <!-- <button class="clear-completed" v-show="todos.length > remaining" @click="clearCompleted">
        Clear completed
      </button> -->
        </footer>
    </section>
</template>

<script>
import Todo from './Todo.vue';

const STORAGE_KEY = 'todos';
const filters = {
    all: todos => todos,
    active: todos => todos.filter(todo => !todo.done),
    completed: todos => todos.filter(todo => todo.done)
};
const defalutList = [
    { text: 'star this repository', done: false },
    { text: 'fork this repository', done: false },
    { text: 'follow author', done: false },
    { text: 'vue-element-admin', done: true },
    { text: 'vue', done: true },
    { text: 'element-ui', done: true },
    { text: 'axios', done: true },
    { text: 'webpack', done: true }
];
export default {
    components: { Todo },
    filters: {
        /**
         * 过滤器, 处理复数
         * @param n
         * @param w
         * @return {string}
         */
        pluralize: (n, w) => (n === 1 ? w : w + 's'),
        /**
         * 过滤器, 首字母大写
         * @param s
         * @return {string}
         */
        capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
    },
    data() {
        return {
            // 是否可见
            visibility: 'all',
            // 过滤器
            filters,
            // 待办事项
            todos: defalutList
        };
    },
    computed: {
        /**
         * 完成所有代办事项
         */
        allChecked() {
            return this.todos.every(todo => todo.done);
        },
        /**
         * 过滤代办事项
         */
        filteredTodos() {
            return filters[this.visibility](this.todos);
        },
        /**
         * 剩余代办事项竖向
         */
        remaining() {
            return this.todos.filter(todo => !todo.done).length;
        }
    },
    methods: {
        /**
         * 存储代办事项
         */
        setLocalStorage() {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
        },
        /**
         * 添加代办事项
         * @param e
         */
        addTodo(e) {
            const text = e.target.value;
            if (text.trim()) {
                this.todos.push({
                    text,
                    done: false
                });
                this.setLocalStorage();
            }
            e.target.value = '';
        },
        /**
         * 切换代办事项状态
         * @param val
         */
        toggleTodo(val) {
            val.done = !val.done;
            this.setLocalStorage();
        },
        /**
         * 删除代办事项
         * @param todo
         */
        deleteTodo(todo) {
            this.todos.splice(this.todos.indexOf(todo), 1);
            this.setLocalStorage();
        },
        /**
         * 编辑代办事项
         * @param todo
         * @param value
         */
        editTodo({ todo, value }) {
            todo.text = value;
            this.setLocalStorage();
        },
        /**
         * 过滤已完成事项
         */
        clearCompleted() {
            this.todos = this.todos.filter(todo => !todo.done);
            this.setLocalStorage();
        },
        /**
         * 完成所有代办事项
         * @param done
         */
        toggleAll({ done }) {
            this.todos.forEach(todo => {
                todo.done = done;
                this.setLocalStorage();
            });
        }
    }
};
</script>

<style lang="scss">
@import './index.scss';
</style>
