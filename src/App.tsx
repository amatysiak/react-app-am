import React, { useEffect, useState } from "react";
import "./fonts/SFProText/SF-Pro-Text-Regular.ttf";
import "./App.scss";

import EmailAutocompleter from "./components/EmailAutpocompleter/EmailAutocompleter";

function App() {
  const [suggestions, setSuggestions] = useState<string[]>([""]);

  useEffect(() => {
    const url = "https://api.mocki.io/v2/2228417d/react-app-am-api";

    const fetchData = async() => {
      try {
        fetch(url)
            .then(response => response.json())
            .then(json => setSuggestions(json.data));
      } catch(error) {
        console.log("Error: ", error);
      }
    }

    fetchData();;
  }, [])

  return (
    <EmailAutocompleter suggestions={suggestions} />
  );
}

export default App;
