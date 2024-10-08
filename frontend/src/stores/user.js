import {defineStore} from 'pinia'
import {ipc} from "@/utils/ipcRenderer";
import {ipcApiRoute} from "@/api/main";
import sysLoginApi from "@/api/http/sys-login-api";
import router from "@/router";

/**
 * 定义一个用户信息store
 */
export const useUserStore = defineStore('user', {
    state: () => ({
        token: '',
        userinfo: {}
    }),

    actions: {
        async loadToken() {
            let token = await ipc.invoke(ipcApiRoute.getCache, 'token');
            if (token) {
                this.token = token;
            } else {
                this.token = '';
            }
            console.log('load token finish, token: ' + this.token);
        },
        saveToken(token) {
            this.token = token;
            let args = {
                key: 'token',
                value: token
            }
            ipc.invoke(ipcApiRoute.cache, JSON.stringify(args)).then((resp) => {
                console.log('saveToken >>> ' + resp);
            });
        },
        saveUserinfo(userinfo) {
            this.userinfo = userinfo;
        },
        logout() {
            sysLoginApi.logout().finally(() => {
                ipc.invoke(ipcApiRoute.closeMpv, {windowName: 'AnimeVideo'}).then(resp => console.log('[hideMpv] result: ', resp));
                router.push({name: 'LoginIndex'}).then(r => console.log(r));
            });
        }
    }
})
