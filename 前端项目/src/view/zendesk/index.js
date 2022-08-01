import React, { useEffect } from 'react'

const Index = () => {
    // window.zE('webWidget', 'hide');
    window.zESettings = {
        webWidget: {
            position: { horizontal: 'right', vertical: 'bottom' },
            contactForm: {
                attachments: true,
                subject: false,
                // suppress: true,
            },
            contactOptions: {
                enabled: true,
                contactButton: { '*': 'Get in touch' },
                contactFormLabel: { '*': 'Leave a message' }//给我们留言
            }
        }
    }
    useEffect(() => {
        zE('webWidget', 'open');
        return () => {
            zE('webWidget', 'close');
            zE('webWidget', 'logout');
            zE('webWidget', 'clear');
        }
    }, []);
    const goPage = () => {
        window.history.back();
        // history.goBack()
    };
    return(
        <button onClick={goPage}>返回上一页</button>
    )
}

export default Index