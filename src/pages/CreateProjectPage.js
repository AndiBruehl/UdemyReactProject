import { useRef } from "react";
import Button from "../layout/Button";
import Input from "../layout/Input";
import TextArea from "../layout/TextArea";
import { firestore_db } from "../firebase";
import { addDoc, getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Selection from "../layout/Selection";
import { useEffect, useState } from "react";

let tempUsers;

const CreateProjectPage = () => {
  const textRef = useRef("");
  const dateRef = useRef("");
  const titleRef = useRef("");
  const categoryRef = useRef("");
  const userRef = useRef("");

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    tempUsers = [];

    const loadData = async () => {
      getDocs(collection(firestore_db, "users")).then(resp => resp.docs.map(item => tempUsers.push({ ...item.data(), id: item.id }))
      ).then(() => setUsers(tempUsers));
    };

    loadData().then(() => setLoading(false));
  }, [])

  const clickHandler = (event) => {
    event.preventDefault();
    console.log(titleRef.current.value, dateRef.current.value, textRef.current.value, categoryRef.current.value,);

    const data = {
      title: titleRef.current.value,
      date: dateRef.current.value,
      text: textRef.current.value,
      category: categoryRef.current.value,
      assignedTo: userRef.current.value
    };

    const collectionRef = collection(firestore_db, 'projects')

    addDoc(collectionRef, data);

    navigate("/dashboard")
  }

  return (
    <div className="main-content">

      <form className="form">
        <Input ref={titleRef} type='text'>Titel vom Projekt:</Input>
        <Input ref={dateRef} type='date'>Abgabetermin vom Projekt:</Input>
        <TextArea ref={textRef}>Beschreibung vom Projekt:</TextArea>
        <Selection ref={categoryRef} content={[
          {
            displayName: "Entwicklung", id: "Entwicklung"
          },
          {
            displayName: "Design", id: "Design"
          },
          {
            displayName: "Marketing", id: "Marketing"
          },
          {
            displayName: "Sales", id: "Sales"
          },
          {
            displayName: "Support", id: "Support"
          }
        ]}>Wähle eine Kategorie:</Selection>
        {!loading &&         <Selection ref={userRef} content={users}>
          Weise die Aufgabe einem Kollegen hinzu:
          </Selection>}
        <Button onClick={clickHandler}>Projekt erstellen</Button>
      </form>
    </div>
  );
}

export default CreateProjectPage;
