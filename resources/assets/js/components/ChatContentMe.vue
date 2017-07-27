<template>
        <div class="content col-md-5 col-md-offset-6">
            <span class="user"> 我 </span>说：
            <p class="detail">
                {{ msg }}
            </p>
        </div>
</template>

<script>
    export default {
        props:['msg']
    }
</script>