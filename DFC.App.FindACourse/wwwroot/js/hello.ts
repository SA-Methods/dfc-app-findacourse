function greeter(person: string) {
    return "Hello, " + person;
}

let user = "hello world";

document.body.textContent = greeter(user);