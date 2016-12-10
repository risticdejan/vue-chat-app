<template>
    <section class="chat">
        <header>
            <h4>
                Chat:
                <span>
                    {{ username }}
                </span>
                <span style="float: right;">
                    Users: {{ numberOfUsers }}
                </span>
            </h4>
        </header>
        <section class="chat-container">
            <ul ref="list">
                <message v-for="message in messages"
                    :message="message"
                >
                </message>
            </ul>
        </section>
        <footer>
            <input class="new-msg"
                v-show="! connected"
                v-focus="! connected"
                placeholder="Type your message here..."
                @keyup.enter="sendMessage"
            />
            <input class="new-user"
                v-show="connected"
                autofocus
                placeholder="What's your nickname?"
                @keyup.enter="addUser"
            />
        </footer>
    </section>
</template>

<script>
    import io from 'socket.io-client'
    var socket = io('http://localhost:3000');
    import Message from './Message.vue'
    import { mapMutations } from 'vuex'

    export default {
        name: 'chat',
        components: {
            Message
        },
        directives: {
            focus (el, { value }, { context }) {
                if (value) {
                    context.$nextTick(() => {
                        el.focus()
                    })
                }
            }
        },
        data() {
            return {
                connected: true,
                username: '',
                numberOfUsers: 0,
            }
        },
        computed: {
            messages() {
                return this.$store.state.messages
            }
        },
        mounted() {
            this.$nextTick( () => {

                socket.on('new message', data => {
                    this.addMessage(data);
                    this.numberOfUsers = data.numUsers;
                });

                socket.on('login',  data => {
                    this.connected = false;
                    this.username = data.username;
                    this.numberOfUsers = data.numUsers;

                    data.body = "Welcome to Chat ";
                    this.addMessage(data);
                });

                socket.on('user joined', data => {
                    this.numberOfUsers = data.numUsers;

                    data.body = data.username + " has joined us.";
                    this.addMessage(data);
                });

                socket.on('user left', data => {
                    this.numberOfUsers = data.numUsers;

                    data.body = data.username + ' has left us.';
                    this.addMessage(data);
                });
            })
        },
        watch: {
            'messages': function () {
                this.$nextTick(() => {
                    const ul = this.$refs.list
                    ul.scrollTop = ul.scrollHeight
                })
            }
        },
        methods: {
            sendMessage(e) {
                this.sendInput(e, 'send message')
            },
            addUser(e) {
                this.sendInput(e, 'add user')
            },
            sendInput(e, eventName) {
                const input = e.target.value

                if(input.trim() ) {
                    socket.emit(eventName, input)
                }

                e.target.value = ''
            },
            ...mapMutations([
                'addMessage'
            ])
        }
    }
</script>


<style>
    .chat {
        background: #fff;
        position: relative;
        border: .1em solid #ccc;
    }

    .chat header{
        padding: 1em;
        background: rgba(0,0,0,.06);
    }

    .chat .chat-container {
        padding: 0;
    }

    .chat footer {
        background: rgba(0,0,0,.02);
    }

    .chat header  h4 {
        font-weight: bold;
        margin: 0;
        padding: 0;
    }

    .chat header  h4 span {
        font-weight: bold;
        color: #888;
    }

    :focus {
        outline: 0;
    }

    .new-msg,
    .new-user {
        background: inherit;
        border: none;
        position: relative;
        margin: 0;
        width: 100%;
        line-height: 1.4em;
        padding: 1em;
    }

    .chat-container ul {
        padding: 1em;
        margin: 0;
        height: 20em;
        overflow-y: auto;
    }

    .chat-container li.message {
        list-style-type: none;
        overflow: hidden;
        margin-bottom: 1em;
        width: 100%;
    }

    .chat-container .message .details {
        margin-bottom: .5em;
    }

    .chat-container .message .content {
        padding: 0;
        text-indent: 1em;
        line-height: 1.4em;
        font-size: 1em;
        border-radius: .4em;
        position: relative;
        color: #888;
    }
</style>
