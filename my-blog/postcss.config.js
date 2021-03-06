/*
 * @Description:用配置postcss 即用于适配浏览器，包括屏幕大小等，添加浏览器前缀
 * @version:
 * @Author: camus
 * @Date: 2021-01-22 10:13:06
 * @LastEditors: camus
 * @LastEditTime: 2021-02-25 14:12:23
 */

module.exports = {
    "plugins": {
        // 官方说明文档 https://github.com/evrone/postcss-px-to-viewport/blob/HEAD/README_CN.md
        "postcss-px-to-viewport": {
            unitToConvert: 'px', //需要转换的单位
            viewportWidth: 1920, // 设计稿的视口宽度
            unitPrecision: 5, // 单位转换后保留的精度
            propList: ['*'], // 能转行为vw的属性列表
            viewportUnit: 'vw', // 希望使用的视口单位
            fontViewportUnit: 'vw', // 字体使用的视口单位
            selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, // 媒体查询里的单位是否需要转换单位
            replace: true, // 是否直接更换属性值，而不添加备用属性
            exclude: [], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
            landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            landscapeUnit: 'vw', // 横屏时使用的单
            landscapeWidth: 568 //横屏时使用的视口宽度
        }
        // 可以在这配置第二个插件比如
        // postcss-preset-env
    }
}
