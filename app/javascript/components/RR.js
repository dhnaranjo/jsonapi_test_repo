import React from "react";

const User = ReactiveRecord.model("User")
function Users() {
    return (
        <Collection for={User}>
            { users => {
                console.log(users)
                return (
                    <div>
                        {users.map(user => <span>{user.id}</span>)}
                    </div>
                );
            }}
        </Collection>
    )
}
