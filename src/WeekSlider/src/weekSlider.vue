<template>
    <div class="week-slider">
        <div class="sliders">
            <slider v-for="(date, index) in dates" :date="date"></slider>
        </div>
    </div>
</template>

<script>
import slider from './slider.vue'
export default {
    name: 'weekSlider',
    components: {slider},
    data () {
        return {
            dates: ['2016-06-18','2016-06-25','2016-07-02']
        }
    }
}
</script>

<style>

</style>
