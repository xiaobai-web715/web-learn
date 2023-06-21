import { h } from "vue";
import * as icons from "@element-plus/icons-vue";
import './icon.scss';
const Icon = (props) => {
    return (
        props['icon-name'] ? (
            <div class="icon-style custom">
                {
                    h(icons[props['icon-name']])
                }
            </div>
        ) : ''
    );
};
export default Icon;
// export default {
//     name: 'Icon',
//     iconName: String,
//     props: {
//         iconName: {
//             type: String,
//             default: ''
//         }
//     },
//     render() {
//         return (
//             this.iconName ? (
//                 <div class="icon-style custom">
//                     {
//                         h(icons[this.iconName])
//                     }
//                 </div>
//             ) : '' 
//         );
//     }
// };