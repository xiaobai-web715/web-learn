import { ConfigProvider, theme } from 'antd';
import { useTipStore } from '@/store/tiptap';
const AntdThemeChange = <P extends object>(Wrapper: React.ComponentType<P>) => {
    const AntdTheme = (props: P) => {
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
    return AntdTheme;
};

export default AntdThemeChange;
