
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Vue.component('example', require('./components/Example.vue'));
Vue.component('chat_content_me', require('./components/ChatContentMe.vue'));
Vue.component('chat_content_other', require('./components/ChatContentOther.vue'));


const app = new Vue({
    el: '#app',
    data: {
        online: 0,
        members: [
            {
                id: null,
                name:null,
            }
        ],
        message: '',
        hismessage: []
    },
    methods: {
        sendMessage: function () {
            if (this.message != '') {
                axios.post('/send/message', {message: this.message});
                msg = {isme: true, message: this.message};
                this.hismessage.push(msg);
                this.message = '';
                this.scrollToButton("chat-content");
            }
        },
        scrollToButton: function (id) {
            setTimeout("var objDiv = document.getElementById('"+id+"');objDiv.scrollTop = objDiv.scrollHeight;",1000)
        }
    }
});

// echo.private('chat-room.1')
//     .listen('ChatMessageWasReceived', (data) => {
//     console.log(data.user, data.chatMessage);
// });


echo.join('common.1')
    .here(function (members) {
        // runs when you join, and when anyone else leaves or joins
        app.online = members.length;
        app.members = members;
    })
    .joining(function (joiningMember, members) {
        // runs when another member joins
        app.online++;
        app.members.push(joiningMember);
    })
    .leaving(function (leavingMember, members) {
        // runs when another member leaves
        var index = getIndex(app.members, leavingMember.id);
        if (index != -1) {
            app.members.splice(index, 1);
            app.online--;
        }
    })
    .listen('ChatMessageWasReceived', (data) => {
        msg = {isme: false, name: data.user.name, message: data.chatMessage.message};
        app.hismessage.push(msg);
        app.scrollToButton("chat-content");
    });




function getIndex(arr, id) {
    for(var i=0;i<arr.length;i++){
        if (arr[i].id == id) {
            return i;
        }
    }
    return -1;
}