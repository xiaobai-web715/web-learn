import { h } from "vue";
import * as icons from "@element-plus/icons-vue";
import './icon.scss';
const Icon = ({iconName}:{iconName: string}) => {
    console.log(icons, iconName);
    return (
        iconName ? (
            <div class="icon-style custom">
                {
                    h(icons[iconName])
                }
            </div>
        ) : ''
    )
}
export default Icon
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