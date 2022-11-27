const { useState, useEffect } = require("react");

const useToken = (user) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (user) {
      const name = user?.displayName;
      const email = user?.email;
      const uid = user?.uid;
      const phoneNumber = user?.phoneNumber;

      let userInfo = { uid };
      if (phoneNumber) {
        userInfo = { ...userInfo, phoneNumber };
      }
      if (email) {
        userInfo = { ...userInfo, email, name };
      }

      fetch("http://localhost:5000/backend/token", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((result) => {
          const token = result.accessToken;
          window.localStorage.setItem("accessToken", token);
          setToken(token);
        });
    }
  }, [user]);

  return [token];
};

export default useToken;
