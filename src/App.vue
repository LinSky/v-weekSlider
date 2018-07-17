<template>
    <div>
        <week-slider @dateClick="dateClickhandler" :showYear="true"></week-slider>
    </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {

        }
    },
    methods: {
        dateClickhandler (date) {
            console.log(date);
        }
    }
}
</script>

<style scoped>

</style>
