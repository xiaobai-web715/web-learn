import { h } from "vue";
import * as icons from "@element-plus/icons-vue";
import './icon.scss';
export default {
    name: 'Icon',
    props: {
        iconName: {
            type: String,
            default: ''
        }
    },
    render() {
        console.log('iconName', this.iconName);
        return (
            this.iconName ? (

                <div className="icon-style custom">
                    {
                        h(icons[this.iconName])
                    }
                </div>
            ) : '' 
        );
    }
};