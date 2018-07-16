// A DApp that sums up two numbers

function asNumber(x) {
    if (typeof x === "number") return x;
    if (typeof x === "string") return Number.parseInt(x, 10);
    throw Error("Not a number: " + x);
}

var a = asNumber(params.a);
var b = asNumber(params.b);

a + b;
