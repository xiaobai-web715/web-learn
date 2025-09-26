import { ConfigProvider, theme } from 'antd';
import { useTipStore } from '@/store/tiptap';
const AntdThemeChange = <P extends Object>(Wrapper: React.ComponentType<P>) => {
    return (props: P) => {
        const { isDark } = useTipStore();
        return (
            <ConfigProvider
                theme={{
                    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
                }}
            >
                <Wrapper {...props} />
            </ConfigProvider>
        );
    };
};

export default AntdThemeChange;
