// useIntersectionObserver：响应式监听目标元素的可见性。
import { useIntersectionObserver } from '@vueuse/core'

// 定义懒加载插件
export const lazyPlugin = {
    install: (app) => {
        /*
        定义全局指令
        img-lazy：指令名称
    */
        app.directive('img-lazy', {
            // 指令的定义
            mounted(el, binding) {
                /*
                    el:指令绑定的那个元素 img
                    binding:binding.value指令绑定的值
                */
                const { stop } = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                        // 如果是在当前视口下则赋值
                        if (isIntersecting) {
                            el.src = binding.value;
                            stop(); //图片加载完毕停止监听
                        }
                    },
                )
            }
        })
    },
}

