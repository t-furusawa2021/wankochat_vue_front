<template>
    <div class="chat">
        <div class="row">
            <table class="table m-auto offset-2 col-8">
                <thead>
                    <tr>
                        <th class="text-white">送信日</th>
                        <th class="text-white">内容</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="m in this.messages" v-bind:key="m.key">
                        <th class="text-white">{{m.created_at | dateFormat}}</th>
                        <th class="text-white" v-text="m.body"></th>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="row">
            <div class="offset-4 col-4">
                <textarea
                    class="form-control"
                    v-model="message"
                    @keypress.prevent.enter.exact="enable_submit"
                    @keyup.prevent.enter.exact="submit">
                </textarea>
                <div class="text-right">
                    <button class="btn btn-primary" type="button" @click="send()">送信</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import { getDatabase, ref, push, onValue } from "firebase/database";
export default {
    data() {
        return {
            message: '',
            messages: {},
            can_submit_search: false,
        }
    },
    methods: {
        send() {
            const db = getDatabase();
            push(ref(db, 'chats'), {
                body: this.message,
                created_at: moment().toString()
            });
            this.message = '';
        },
        // メッセージを取得する。
        getMessages() {
            const db = getDatabase();
            const chatRef = ref(db, 'chats/');
            onValue(chatRef, (snapshot) => {
                const data = snapshot.val();
                this.messages = data ?? {}
            });
        },
        // 日本語入力の確定エンターも考慮してエンターボタンでメッセージを送信する。
        enable_submit() {
            this.can_submit_search = true;
        },
        submit() {
            if (!this.can_submit_search || !this.message) return;
            this.send();
            this.can_submit_search = false;
        },
    },
    // ページ遷移の際にメッセージの取得とチャンネルへの接続を行う。
    mounted() {
        this.getMessages();
    },
    filters: {
        // 時間の表示をフォーマットする。
        dateFormat: function (value){
            if(value != '') {
                return moment(value).local().format('YYYY/MM/DD/HH:mm');
            }
        },
    },
  }
</script>

<style>
    .table {
        background-color: rgb(255, 208, 0, 0.5);
    }
</style>
