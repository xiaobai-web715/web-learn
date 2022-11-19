// 建立jest测试
const handlers = require('../handlers')

// 'home page renders'是测试的描述文本  后面的函数就是想要测试的功能
test('home page renders', () => {
    const req = {}
    const res = { render: jest.fn() }
    handlers.home(req, res)
    expect(res.render.mock.calls.length).toBe(1) // 确保测试的功能只会被调用一次
    expect(res.render.mock.calls[0][0]).toBe('home') // 确保测试的功能(jest.fn())被调用的时候是以home作为第一个参数
})

test('about page renders', () => {
    const req = {}
    const res = { render: jest.fn() }
    handlers.about(req, res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('about')
    expect(res.render.mock.calls[0][1]).toEqual(
        expect.objectContaining({
            fortune: expect.stringMatching(/\W/)
        })
    ) // render函数接收的第二个参数
})

test('404 handler renders', () => {
    const req = {}
    const res = { render: jest.fn() }
    handlers.notFoundPage(req, res)
    expect(res.render.mock.calls.length).toBe(1) // 确保测试的功能只会被调用一次
    expect(res.render.mock.calls[0][0]).toBe('404')
    expect(res.render.mock.calls[0][1]).toEqual(
        expect.objectContaining({
            fortune: expect.stringMatching(/\W/)
        })
    )
})

test('500 handler renders', () => {
    const err = new Error('some error')
    const req = {}
    const res = { render: jest.fn() }
    const next = jest.fn()
    handlers.severError(err, req, res, next)
    expect(res.render.mock.calls.length).toBe(1) // 确保测试的功能只会被调用一次
    expect(res.render.mock.calls[0][0]).toBe('500')
})
