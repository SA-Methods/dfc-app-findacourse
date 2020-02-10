function greeter(person: string) {
    return "Hello, " + person;
}

let user = "hello sumair.";

window.onload = function () {
    var test = (<HTMLDivElement>document.getElementById('jscontent'));
    test.innerHTML = user;
}
