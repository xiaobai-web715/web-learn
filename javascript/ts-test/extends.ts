interface Animal {
    kind: string
}

interface Dog extends Animal {
    bark(): void
}

const result: Dog = {
    kind: '123',
    bark: () => { }
}