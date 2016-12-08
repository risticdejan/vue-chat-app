<template>
    <section class="chat">
        <header>
            <h4>
                Chat:
            </h4>
        </header>
        <section class="chat-container">
            <ul>
                <li class="message">
                    <div class="details">
                        <span>
                            <i class="glyphicon glyphicon-record"></i> <b>Admin</b>
                        </span>
                        <span style="float: right">
                            10:22:43 PM
                        </span>
                    </div>
                    <div class="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam scelerisque pretium mauris sed feugiat. Suspendisse malesuada ex eget elit dapibus euismod.
                    </div>
                </li>
            </ul>
        </section>
        <footer>
            <input class="new-user"
                autofocus
                placeholder="What's your nickname?"
            />
        </footer>
    </section>
</template>

<script>
    import io from 'socket.io-client'
    var socket = io('http://localhost:3000');

    export default {
        name: 'chat',
        mounted() {
            console.log('Component: The chat is ready')
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
