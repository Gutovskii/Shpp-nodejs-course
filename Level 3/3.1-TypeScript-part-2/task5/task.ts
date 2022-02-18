declare function func1<T extends { id?: string }>(data: T): any;

declare function func2 (supplement: <T extends { id?: string }>(data: T) => T): any;

class Rectangle {
    w!: number;
    h!: number;
}
class Circle {
    radius!: number
}

function produce<A>(ctor: { new(): A }, count: number): A[] {
    let a: A[] = [];
    for (let i = 0; i < count; i++) {
        a.push(new ctor);
    }
    return a;
}

const arr: Rectangle[] = produce(Rectangle, 4);