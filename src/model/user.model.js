export default class UserModel {


    constructor(id, name, email, password){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }


    static add(name, email, password) {

        const id = 'U'+Date.now();
        const newUser = new UserModel(id, name, email, password);
        users.push(newUser);
    }

    static authenticate(email, password) {
        return users.find((user) => user.email === email && user.password === password);
    }

}


var users = [
    new UserModel('U1', 'John Doe', 'john@gmail.com', 'pass'),
    new UserModel('U2', 'Debasish Halder', 'hdebasish@gmail.com', '12345')

]