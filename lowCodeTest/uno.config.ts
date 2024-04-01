import { defineConfig, presetAttributify, presetUno } from "unocss";
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
    presets: [
        presetAttributify(),
        presetUno(),
        presetRemToPx({
            baseFontSize: 4,
        })
    ],
    rules: [
        [/^ml-([\.\d]+)$/, ([_, num]) => ({ 'margin-left': `${num}px`})],
        [/^mb-([\.\d]+)$/, ([_, num]) => ({ 'margin-bottom': `${num}px`})],
        [/^mr-([\.\d]+)$/, ([_, num]) => ({ 'margin-right': `${num}px`})],
        [/^mt-([\.\d]+)$/, ([_, num]) => ({ 'margin-top': `${num}px`})],
        [/^pd-([\.\d]+)-([\.\d]+)-([\.\d]+)-([\.\d]+)/, ([_, ...paddingList]) => {
            const [top, right, bottom, left] = paddingList
            return ({padding: `${top}px ${right}px ${bottom}px ${left}px`})
        }],
        ["flex", {display: 'flex', "align-items": "center", "justify-content": "space-between"}]
    ]
})