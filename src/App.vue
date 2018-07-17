<template>
    <div>
        <week-slider @dateClick="dateClickhandler" :showYear="true" defaultDate="2018-07-18"></week-slider>
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
