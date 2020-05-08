import ReactiveRecord, { Model } from "reactiverecord"
class User extends Model {
    static schema = {
        id: String,
        attributes: {
            email: String,
            role: String,
            secret: String,
            _timestamps: true
        },
    }
    
}

export default ReactiveRecord.model("User", User);