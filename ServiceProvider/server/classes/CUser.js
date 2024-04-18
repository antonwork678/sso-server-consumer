class CUser
{
    _id;
    email;
    name;
    role;
    is_activated;

    constructor(model) {
        this._id = model._id
        this.name = model.name
        this.email = model.email
        this.role = model.role
        this.is_activated = model.is_activated
    }

    plain() {
        return {
            _id: this._id,
            name: this.name,
            email: this.email,
            role: this.role,
            is_activated: this.is_activated
        }
    }
}

module.exports = CUser