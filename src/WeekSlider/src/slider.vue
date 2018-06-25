<template>
    <div class="slider">
        {{date}}
    </div>
</template>

<script>
export default {
    name: 'slider',
    props: {
        date: {
            type: String,
            default: '2018-06-25'
        }
    },
    data () {
        return {

        }
    }
}
</script>

<style>

</style>
