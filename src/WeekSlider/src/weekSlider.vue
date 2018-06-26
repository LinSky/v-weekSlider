<template>
    <div class="week-slider">
        <div class="sliders">
            <slider v-for="(date, index) in dates" :date="date" :defaultDate="defaultDate" :key="index"></slider>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import slider from './slider.vue'
export default {
    name: 'weekSlider',
    components: {slider},
    props: {
        defaultDate: {
            type: String,
            default: moment().format('YYYY-MM-DD')
        }
    },
    data () {
        return {
            week: moment().weeks()
        }
    },
    computed: {
        dates: function () {
            let vm = this
            let arr = []
            arr.push(
                moment(vm.defaultDate).subtract(7, 'd').format('YYYY-MM-DD'),
                vm.defaultDate,
                moment(vm.defaultDate).add(7, 'd').format('YYYY-MM-DD')
            )
            return arr
        }
    }
}
</script>
<style scoped>
.sliders{
    height: 48px; overflow: hidden;
}
</style>
