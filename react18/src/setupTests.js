import { server } from "./mocks/server";

//在所有tests之前建立模拟
beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

//tests的之后进行清理
afterAll(() => server.close());