import { firestore_db } from "../firebase";
import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import InfoText from "../components/InfoText";
import FilterBar from "../components/FilterBar";
import ProjectItem from "../components/ProjectItem";
import ProjectContainer from "../layout/ProjectContainer";

let data = [];

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("Alle");

  const categories = ["Alle", "Entwicklung", "Design", "Marketing", "Sales", "Support"];

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const collectionRef = collection(firestore_db, "projects");

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      } else {
        data = [];

        const loadData = async () => {
          getDocs(collectionRef)
            .then((resp) =>
              resp.docs.map((item) => data.push({ ...item.data(), id: item.id }))
            )
            .then(() => setProjects(data));
        };

        loadData().then(() => setLoading(false));
      }
    });

    return () => {
      unsubscribe(); // Cleanup the subscription
    };
  }, [navigate]);

  const filterHandler = (filter) => {
    const dataToFilter = data;
    const filteredData = dataToFilter.filter(
      (item) => item.category === filter
    );
    setFilter(filter);

    if (filter === "Alle") {
      setProjects(data);
    } else {
      setProjects(filteredData);
    }
  };

  return (
    <div clasname="main-dashboard">
      <div className="divFilterbar">
        <FilterBar
          categories={categories}
          onFilter={filterHandler}
          activeFilter={filter}
        />
      </div>
      <div className="divProjectContainer">
        <ProjectContainer>
          {loading ? (
            <InfoText>Daten werden geladen...</InfoText>
          ) : projects.length !== 0 ? (
            projects.map((item) => (
              <ProjectItem
                key={item.id}
                title={item.title}
                date={item.date}
                assignedTo={item.assignedTo}
                text={item.text} 
              />
            ))
          ) : (
            <InfoText>Keine Ergebnisse gefunden.</InfoText>
          )}
        </ProjectContainer>
      </div>
    </div>
  );
};

export default DashboardPage;
