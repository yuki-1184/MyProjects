import React, { useEffect, useState, useRef } from "react";

export default function Login() {
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
    setApiKey("");
    setSuccess(true);
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="apiKey">API-KEY:</label>
        <br></br>
        <input
          type="password"
          id="apiKey"
          placeholder="RESAS-API-KEY"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          required
        />
        <button>Login</button>
      </form>
    </section>

    // <div>
    //   <h1>API-KEYを入力してください</h1>
    //   <input ref={apiKeyIinput} type="text" placeholder="RESAS-API-KEY" />
    //   <button onClick={handleLogin}>Login</button>
    // </div>
  );
}
