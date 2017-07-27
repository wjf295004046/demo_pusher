<template>
    <div class="content col-md-5 col-md-offset-1">
        <span class="user"> {{ user }} </span>说：
        <p class="detail">
            {{ msg }}
        </p>
    </div>
</template>

<script>
export default {
    props:['msg', 'user']
}
</script>