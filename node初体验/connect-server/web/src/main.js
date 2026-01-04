window.addEventListener('load', () => {
    console.log('load');
    const button = document.createElement('button');
    button.textContent = '点击';
    button.addEventListener('click', () => {
        console.log('click');
    });
    document.body.append(button);
});
