<template>
    <li class="message">
        <div class="details">
            <span  :style="{color: message.color}">
                <i class="glyphicon glyphicon-record"></i> <b>{{ message.username }}</b>
            </span>
            <span style="float: right">
                {{ message.time | time}}
            </span>
        </div>
        <div class="content">
            {{ message.body }}
        </div>
    </li>
</template>

<script>
    export default {
        name: 'message',
        props: ['message']
    }
</script>