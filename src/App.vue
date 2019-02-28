<template>
    <div>
        <week-slider @dateClick="dateClickhandler" :showYear="true" :defaultDate.sync="default_date"></week-slider>
    </div>
</template>

<script>
export default {
    name: 'app',
    
    data () {
        return {
            default_date: '2019-02-25'
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
