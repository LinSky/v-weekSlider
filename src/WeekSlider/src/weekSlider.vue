<template>
    <div class="week-slider">
        <div
            class="sliders"
            ref="sliders"
            @touchstart="touchstartHandle"
            @touchmove="touchmoveHandle"
            @touchend="touchendHandle">
            <template v-for="(item, index) in dates">
                <div class="slider"
                    :style="getTransform(index)"
                    @webkit-transition-end="onTransitionEnd(index)"
                    @transitionend="onTransitionEnd(index)">
                    <div class="day" v-for="(day, dayIndex) in getDaies(item.date)">
                        <div @click="dayClickHandle(day.date)" :class="{today: day.isToday, sameDay: day.isDay && !day.isToday}">{{day.week}}<br><strong>{{day.date.split('-')[2]}}</strong></div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'weekSlider',
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
            isAnimation: false,
            start: {
                x: null,
                y: null
            },
            end: {
                x: null,
                y: null
            },
            distan: {
                x: 0,
                y: 0
            }
        }
    },
    computed: {

    },
    created () {
        let vm = this
        this.dates.push(
                {
                    date: moment(vm.defaultDate).subtract(7, 'd').format('YYYY-MM-DD'),
                },
                {
                    date: vm.defaultDate,
                },
                {
                    date: moment(vm.defaultDate).add(7, 'd').format('YYYY-MM-DD'),
                }
            )
    },
    methods: {
        /**
        *获取制定日期的当前周的日期数据
        */
        getDaies (date) {
            let vm = this,
                arr = []
            let weekOfDate = Number(moment(date).format('E'))
            let weeks = ['日', '一', '二', '三', '四', '五', '六']
            let today = moment(vm.defaultDate)
            for (var i = 0; i < 7; i++) {
                let _theDate = moment(date).subtract(weekOfDate - i, 'd')
                arr.push({
                    date: _theDate.format('YYYY-MM-DD'),
                    week: weeks[i],
                    isToday: _theDate.format('YYYY-MM-DD') === today.format('YYYY-MM-DD'),
                    isDay: _theDate.format('E') === today.format('E')
                })
            }
            return arr
        },

        /**
        *
        */
        getTransform (index) {
            let vm = this
            let style = {}
            if (index === vm.activeIndex) {
                style['transform'] = 'translateX('+ vm.distan.x +'px)'
            }
            if (index < vm.activeIndex) {
                style['transform'] = 'translateX(-100%)'
            }
            if (index > vm.activeIndex) {
                style['transform'] = 'translateX(100%)'
            }
            style['transition'] = vm.isAnimation ? 'transform 0.5s ease-out' : 'transform 0s ease-out'
            return style
        },



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
        },

        /**
         * touchend handle
         */
        touchendHandle (event) {
            let vm = this,
                touch = event.changedTouches[0]
            vm.isAnimation = true
            vm.end.x = touch.pageX
            vm.end.y = touch.pageY
            vm.distan.x = vm.end.x - vm.start.x
            vm.distan.y = vm.end.y - vm.start.y

            vm.getTouchDirection(vm.distan.x, vm.distan.y)
            if (vm.direction === 'left') {
                vm.activeIndex = 2
                // vm.dates.push({
                //     date: moment(vm.dates[vm.activeIndex].date).add(7, 'd').format('YYYY-MM-DD')
                // })
                // vm.dates.shift()
                // vm.activeIndex = 1
            } else if (vm.direction === 'right') {
                vm.activeIndex = 0

            } else{
            }
            vm.distan.x = 0
            vm.distan.y = 0
            vm.direction = null
        },

        onTransitionEnd (index) {
            let vm = this
            vm.isAnimation = false
            if (index === 1 && this.activeIndex === 2) {
                vm.dates.push({
                    date: moment(vm.dates[vm.activeIndex].date).add(7, 'd').format('YYYY-MM-DD')
                })
                vm.dates.shift()
                vm.activeIndex = 1
            }
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
        },

        dayClickHandle (date) {
            this.$emit('dateClick', date)
        }

    }
}
</script>
<style lang="less" scoped>
.week-slider{
    width: 100%; height: 48px; overflow: hidden;
    .sliders{
        position: relative;
        .slider{
            height: 48px; width: 100%; display: flex; position: absolute; top: 0; left: 0; overflow: hidden;
            .day{
                flex: 1;
                div{
                    height: 36px; width: 48px; padding: 6px 0; margin: auto; text-align: center; line-height: 18px; font-size: 12px;
                    &.today{
                        border-radius: 50%; background-color: #dd3629; color: #FFF;
                    }
                    &.sameDay{
                        border-radius: 50%; background-color: #999; color: #FFF;
                    }
                    strong{
                        font-size: 14px;
                    }
                }
            }
        }
    }
}
</style>
