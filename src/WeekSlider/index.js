import weekSlider from './src/weekSlider.vue'

const install = function(Vue, opts = {}) {
    Vue.component(weekSlider.name, weekSlider);
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    weekSlider
}
