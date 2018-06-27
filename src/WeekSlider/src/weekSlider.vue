<template>
    <div class="week-slider">
        <div class="sliders" ref="sliders" @touchstart="touchstartHandle" @touchmove="touchmoveHandle" @touchend="touchendHandle">
            <slider v-for="(item, index) in dates" :date="item.date" :translate="item.translate" :defaultDate="defaultDate" :key="index"></slider>
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
            dates: [],
            direction: null,
            activeIndex: 1,
            start: {
                x: null,
                y: null
            },
            end: {
                x: null,
                y: null
            },
            distan: {
                x: null,
                y: null
            }
        }
    },
    computed: {

    },
    created () {
        console.log(this)
        let vm = this
        this.dates.push(
                {
                    date: moment(vm.defaultDate).subtract(7, 'd').format('YYYY-MM-DD'),
                    translate: -100
                },{
                    date: vm.defaultDate,
                    translate: 0
                },{
                    date: moment(vm.defaultDate).add(7, 'd').format('YYYY-MM-DD'),
                    translate: 100
                }
            )
    },
    methods: {
        /**
         * touchstart handle
         */
        touchstartHandle (event) {
            let vm = this,
                touch = event.touches[0]
            vm.start.x = touch.pageX
            vm.start.y = touch.pageY            
        },

        /**
         * touchmove handle
         */
        touchmoveHandle (event) {
            let vm = this,
                touch = event.touches[0]
            vm.end.x = touch.pageX
            vm.end.y = touch.pageY
            vm.distan.x = vm.end.x - vm.start.x
            vm.distan.y = vm.end.y - vm.start.y   
            vm.dates[vm.activeIndex].translate = vm.distan.x
        },

        /**
         * touchend handle
         */
        touchendHandle (event) {
            let vm = this,
                touch = event.changedTouches[0]
            vm.end.x = touch.pageX
            vm.end.y = touch.pageY
            vm.distan.x = vm.end.x - vm.start.x
            vm.distan.y = vm.end.y - vm.start.y

            vm.getTouchDirection(vm.distan.x, vm.distan.y)
            if (vm.direction === 'left') {
                vm.dates[vm.activeIndex + 1].translate = 0
                vm.dates[vm.activeIndex].translate = -100
                vm.dates.push({
                    date: moment(vm.dates[vm.activeIndex + 1].date).add(7, 'd').format('YYYY-MM-DD'),
                    translate: 100
                })
                vm.$el.children[0].removeChild(vm.$el.children[0].children[0])
                vm.activeIndex++
        
            } else if (vm.direction === 'right') {
                vm.dates[vm.activeIndex - 1].translate = 0
                vm.dates[vm.activeIndex].translate = 100
                vm.dates.unshift({
                    date: moment(vm.dates[vm.activeIndex - 1].date).subtract(7, 'd').format('YYYY-MM-DD'),
                    translate: -100
                })
                vm.$el.children[0].removeChild(vm.$el.children[0].lastChild)
                vm.activeIndex--
            } else{
                vm.dates[1].translate = 0
            }

            vm.direction = null
        },

        /**
         * getAngle 计算角度
         */
        getAngle (x, y) {
            return Math.atan2(y, x) * 180 / Math.PI;
        },

        /**
         * getTouchDirection 获取滑动方向
         */
        getTouchDirection (x, y) {
            let vm = this
            if (Math.abs(x) > 20) {
                let angle = vm.getAngle(x, y)
                if (angle >= -45 && angle <= 45) {//向右
                    vm.direction = 'right'
                } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {//向左
                    vm.direction = 'left'
                }
            }
        }
        
    }
}
</script>
<style lang="less" scoped>
.week-slider{
    width: 100%; height: 48px; overflow: hidden;
    .sliders{
        position: relative;
    }
}
</style>
