import React, { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import "./index.css";
// import RequireApiClient from "src/RequireApiClient";

const RESAS_ENDPOINT = "https://opendata.resas-portal.go.jp";
// F6uHbU8bg4XP9sJBiZVGg3KL3vroy4Lyj8XLOHUE

export default function Login({ changeApiKey }) {
  const apiKeyIinput = useRef();
  const errRef = useRef();

  const [apiKey, setApiKey] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  function handleLogin() {
    console.log(apiKeyIinput.current.value);
  }

  //   useEffect(() => {
  //     apiKeyIinput.current.focus();
  //   }, []);

  useEffect(() => {
    setErrMsg("");
  }, [apiKeyIinput]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    verifyApiKey(apiKey).then((success) => {
      if (success) {
        changeApiKey(apiKey);
        setSuccess(true);
        setApiKey("");
      } else {
        setApiKey("");
        setErrMsg("Error! Please Check Your Api Key!");
      }
    });
    // console.log(isValid);
    // if (isValid) {
    //   console.log("success");
    //   setSuccess(true);
    // } else {
    //   setErrMsg("Api-Key is incorrect!");
    // }
    // setApiKey("");
    console.log(success);
  };

  return (
    <>
      {success ? (
        <Navigate to="/profile" />
      ) : (
        <div className="App">
          <section>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="apiKey">API-KEY:</label>
              <input
                type="password"
                id="apiKey"
                placeholder="RESAS-API-KEY"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                required
              />
              <button>Sign In</button>
            </form>
            <p>
              Need an Api-Key?
              <br />
              <span className="RESAS_Link">
                <a href="https://opendata.resas-portal.go.jp/">Subscribe!</a>
              </span>
            </p>
          </section>
        </div>
      )}
    </>

    // <div>
    //   <h1>API-KEYを入力してください</h1>
    //   <input ref={apiKeyIinput} type="text" placeholder="RESAS-API-KEY" />
    //   <button onClick={handleLogin}>Login</button>
    // </div>
  );
}

async function verifyApiKey(apiKey) {
  console.log(apiKey);
  const url = `${RESAS_ENDPOINT}/api/v1/prefectures`;
  const request = new Request(url, {
    method: "GET",
    headers: { "X-API-KEY": apiKey },
  });
  const response = await fetch(request);
  //   console.log(response);
  const json = await response.json();
  //   console.log(json);
  if (json.statusCode === "403") {
    return false;
  }
  return true;
}
