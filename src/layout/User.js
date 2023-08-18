import TextHeading from "../components/TextHeading";
import { useState, useEffect } from "react";
import { firestore_db} from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import InfoText from "../components/InfoText";
import UserItem from "../components/UserItem";

let tempUsers;

const Users = () => {
    const [loading, setloading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        tempUsers=[];

        const loadData = async () => {
            getDocs(collection(firestore_db, "users")).then(resp => resp.docs.map(item => tempUsers.push({...item.data(), id: item.id}))
            ).then(() => setUsers(tempUsers));
        };

        loadData().then(() => setloading(false));
    }, [])

    return (
        <div style={{ backgroundColor: "azure", position: "fixed", top: 0, right: 0, height: "100vh", width: "300px", zIndex:"2" }}>
            <TextHeading>Meine Kollegen:</TextHeading>
            {loading ? <InfoText>Lade Nutzer...</InfoText> : users.map(item => <UserItem user={item} />)}
        </div>
    );
};

export default Users;
