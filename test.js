let a = {
    b : 1,
    c : 2
};
console.log(a);
(function f() {
    return a = {
        b : 3,
        c : 4
    }
})();

console.log(a);
