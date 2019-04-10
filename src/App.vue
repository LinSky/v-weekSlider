<template>
    <div>
        <week-slider
			@dateClick="dateClickhandler"
      todayTxtColor='#ff0000'
			:showYear="true"
			:defaultDate.sync="default_date">
		</week-slider>
    </div>
</template>

<script>
export default {
    name: 'app',

    data () {
        return {
            default_date: '2019-04-12'
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
