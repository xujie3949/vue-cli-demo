<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">
            <h3 class="title">
                系统登录
            </h3>

            <el-form-item prop="username">
                <div class="prefix">
                    <svg-icon icon="user" />
                </div>
                <el-input
                    ref="username"
                    v-model="loginForm.username"
                    placeholder="账号"
                    name="username"
                    type="text"
                    tabindex="1"
                    autocomplete="on"
                ></el-input>
            </el-form-item>

            <el-tooltip v-model="capsTooltip" content="大写锁定已打开" placement="right" manual>
                <el-form-item prop="password">
                    <div class="prefix">
                        <svg-icon icon="password" />
                    </div>
                    <el-input
                        :key="passwordType"
                        ref="password"
                        v-model="loginForm.password"
                        :type="passwordType"
                        placeholder="密码"
                        name="password"
                        tabindex="2"
                        autocomplete="on"
                        @keyup.caps-lock.native="handleCapslockUp"
                        @blur="handleBlur"
                        @keyup.enter.native="handleLogin"
                    >
                    </el-input>
                    <div class="suffix">
                        <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'" @click="togglePassword" />
                    </div>
                </el-form-item>
            </el-tooltip>

            <el-button
                class="login-button"
                :loading="loading"
                type="primary"
                style="width:100%;margin-bottom:30px;"
                @click.native.prevent="handleLogin"
                @keyup.enter.native="handleLogin"
            >
                登录
            </el-button>

            <div class="addition-section">
                <div>
                    <div class="tips">
                        <span>账号 : administrator</span>
                        <span>密码 : 随便填</span>
                    </div>
                    <div class="tips">
                        <span style="margin-right:18px;"> 账号 : editor </span>
                        <span>密码 : 随便填</span>
                    </div>
                </div>
                <el-button type="primary" @click="showDialog = true">
                    第三方登录
                </el-button>
            </div>
        </el-form>

        <el-dialog title="第三方登录" :visible.sync="showDialog">
            本地不能模拟，请结合自己业务进行模拟
            <br />
            <br />
            <br />
            <social-sign />
        </el-dialog>
    </div>
</template>

<script>
import SocialSign from './components/SocialSignin';

export default {
    name: 'Login',
    components: { SocialSign },
    data() {
        return {
            // 登录表单
            loginForm: {
                // 账号
                username: 'administrator',
                // 密码
                password: '111111'
            },
            // 登录表单验证规则
            loginRules: {
                // 账号验证规则
                username: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: this.validateUsername
                    }
                ],
                // 密码验证规则
                password: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: this.validatePassword
                    }
                ]
            },
            // 密码类型
            passwordType: 'password',
            // 大写锁定提示
            capsTooltip: false,
            // 加载状态
            loading: false,
            // 显示对话框
            showDialog: false,
            // 重定向
            redirect: undefined,
            // 其它查询条件
            otherQuery: {}
        };
    },
    watch: {
        /**
         * 监听路由变化
         */
        $route: {
            handler(route) {
                const query = route.query;
                if (query) {
                    this.redirect = query.redirect;
                    this.otherQuery = this.getOtherQuery(query);
                }
            },
            immediate: true
        }
    },
    /**
     * 组件创建后执行
     */
    created() {
        // window.addEventListener('storage', this.afterQRScan)
    },
    /**
     * 组件渲染后执行
     */
    mounted() {
        if (this.loginForm.username === '') {
            this.$refs.username.focus();
        } else if (this.loginForm.password === '') {
            this.$refs.password.focus();
        }
    },
    /**
     * 组件销毁时执行
     */
    destroyed() {
        // window.removeEventListener('storage', this.afterQRScan)
    },
    methods: {
        /**
         * 验证账户
         * @param rule
         * @param value
         * @param callback
         */
        validateUsername(rule, value, callback) {
            if (value.length < 6) {
                callback(new Error('账号最少长度为6位'));
            } else {
                callback();
            }
        },
        /**
         * 验证密码
         * @param rule
         * @param value
         * @param callback
         */
        validatePassword(rule, value, callback) {
            if (value.length < 6) {
                callback(new Error('密码最长长度为6位'));
            } else {
                callback();
            }
        },
        /**
         * 处理大写锁定按键弹起事件
         * @param e
         */
        handleCapslockUp(e) {
            this.capsTooltip = !this.capsTooltip;
        },
        /**
         * 处理失去焦点事件
         * @param e
         */
        handleBlur(e) {
            this.capsTooltip = false;
        },
        /**
         * 登录
         */
        handleLogin() {
            this.$refs.loginForm
                .validate()
                .then(
                    valid => {
                        this.loading = true;
                        return this.$store.dispatch('user/login', this.loginForm);
                    },
                    error => {
                        this.$message.error('账户或密码验证失败!');
                    }
                )
                .then(res => {
                    this.$router.push({
                        path: this.redirect || '/',
                        query: this.otherQuery
                    });
                    this.loading = false;
                })
                .catch(error => {
                    this.loading = false;
                    this.$message.error(error.message || '登录失败!');
                });
        },
        /**
         * 切换是否显示密码
         */
        togglePassword() {
            if (this.passwordType === 'password') {
                this.passwordType = '';
            } else {
                this.passwordType = 'password';
            }
            this.$refs.password.focus();
        },
        /**
         * 提取出redirect之外的其余参数
         * @param query
         */
        getOtherQuery(query) {
            const res = {};
            Object.keys(query).forEach(key => {
                if (key !== 'redirect') {
                    res[key] = query[key];
                }
            });
            return res;
        }
        // afterQRScan() {
        //   if (e.key === 'x-admin-oauth-code') {
        //     const code = getQueryObject(e.newValue)
        //     const codeMap = {
        //       wechat: 'code',
        //       tencent: 'code'
        //     }
        //     const type = codeMap[this.auth_type]
        //     const codeName = code[type]
        //     if (codeName) {
        //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
        //         this.$router.push({ path: this.redirect || '/' })
        //       })
        //     } else {
        //       alert('第三方登录失败')
        //     }
        //   }
        // }
    }
};
</script>

<style lang="scss" scoped>
$bg: #283443;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $bg;

    .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
    }

    .login-form {
        flex: none;
        width: 520px;
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    &::v-deep .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: $bg;
        border-radius: 5px;
        color: #454545;

        .el-form-item__content {
            display: flex;
            align-items: center;
        }

        .prefix,
        .suffix {
            flex: 0.07;
            display: flex;
            justify-content: center;
            align-items: center;
            color: $dark_gray;
            height: 40px;
        }

        .el-input {
            flex: 0.86;
            .el-input__inner {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 0px;
                color: $light_gray;
                caret-color: $cursor;

                &:-webkit-autofill {
                    box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: $cursor !important;
                }
            }
        }

        .suffix .svg-icon {
            cursor: pointer;
            user-select: none;
        }
    }

    .login-button {
        width: 100%;
        margin-bottom: 30px;
    }

    .addition-section {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
}
</style>
