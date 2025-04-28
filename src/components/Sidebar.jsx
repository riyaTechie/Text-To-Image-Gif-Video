import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

const Sidebar = ({ onSubmit, setText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    if (!user) {
      setSearchHistory([]);
      return;
    }

    const userRef = doc(db, "userSearchData", user.uid);

    const unsubscribe = onSnapshot(
      userRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data?.searchQuery) {
            setSearchHistory([...data.searchQuery].reverse());
          } else {
            setSearchHistory([]);
          }
        } else {
          console.log("No search history found for this user.");
          setSearchHistory([]);
        }
      },
      (error) => {
        console.error("Error in real-time listener:", error.message);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return (
    <section>
      <div>
        <img
          src="src/assets/menu.png"
          alt="menu"
          onClick={() => setIsOpen(!isOpen)}
        />

        <hr />
      </div>

      {isOpen && (
        <div className="sidebar-content">
          <h5>Recent</h5>

          <div className="history">
            {searchHistory?.map((query, index) => {
              return (
                <p
                  key={`history_${index}`}
                  value={query}
                  onClick={() => {
                    setText(query);
                    onSubmit(query);
                  }}
                >
                  {query.length > 27 ? `${query.slice(0, 27)}...` : query}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default Sidebar;
