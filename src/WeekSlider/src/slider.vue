<template>
    <div class="slider">
       <div class="day" v-for="(item, index) in days" :key="item.date">
           <div :class="{today: item.isToday, sameDay: item.isDay && !item.isToday}">{{item.week}}<br><strong>{{item.date.split('-')[2]}}</strong></div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'slider',
    props: {
        date: {
            type: String,
            required: true,
        },
        defaultDate: {
            type: String,
            required: true,
        }
    },
    computed: {
        days: function () {
            let vm = this, 
                date = vm.date, 
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
        }
    },
    data () {
        return {

        }
    }
}
</script>
<style lang="less" scoped>
.slider{
    height: 48px; display: flex;
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
</style>
