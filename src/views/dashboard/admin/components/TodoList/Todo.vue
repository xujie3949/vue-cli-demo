<template>
    <li :class="{ completed: todo.done, editing: editing }" class="todo">
        <div class="view">
            <input :checked="todo.done" class="toggle" type="checkbox" @change="toggleTodo(todo)" />
            <label @dblclick="editing = true" v-text="todo.text" />
            <button class="destroy" @click="deleteTodo(todo)" />
        </div>
        <input
            v-show="editing"
            v-focus="editing"
            :value="todo.text"
            class="edit"
            @keyup.enter="doneEdit"
            @keyup.esc="cancelEdit"
            @blur="doneEdit"
        />
    </li>
</template>

<script>
export default {
    name: 'Todo',
    directives: {
        /**
         * 自动获取焦点
         */
        focus(el, { value }, { context }) {
            if (value) {
                context.$nextTick(() => {
                    el.focus();
                });
            }
        }
    },
    props: {
        /**
         * 代办事项
         */
        todo: {
            type: Object,
            default: function() {
                return {};
            }
        }
    },
    data() {
        return {
            /**
             * 是否正在编辑
             */
            editing: false
        };
    },
    methods: {
        /**
         * 触发deleteTodo事件
         * @param todo
         */
        deleteTodo(todo) {
            this.$emit('deleteTodo', todo);
        },
        /**
         * 触发editTodo事件
         * @param todo
         * @param value
         */
        editTodo({ todo, value }) {
            this.$emit('editTodo', { todo, value });
        },
        /**
         * 触发toggleTodo事件
         * @param todo
         */
        toggleTodo(todo) {
            this.$emit('toggleTodo', todo);
        },
        /**
         * 完成编辑
         * @param e
         */
        doneEdit(e) {
            const value = e.target.value.trim();
            const { todo } = this;
            if (!value) {
                this.deleteTodo({
                    todo
                });
            } else if (this.editing) {
                this.editTodo({
                    todo,
                    value
                });
                this.editing = false;
            }
        },
        /**
         * 取消编辑
         * @param e
         */
        cancelEdit(e) {
            e.target.value = this.todo.text;
            this.editing = false;
        }
    }
};
</script>
