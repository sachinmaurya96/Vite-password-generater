import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  const passwordref = useRef(null);
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllow) str += "0123456789";
    if (charAllow) str += "!@#$%^&*()_+";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, charAllow, numberAllow]);
  useEffect(() => {
    generatePassword();
  }, [charAllow, numberAllow, length]);

  const copyToClipbord = () => {
    window.navigator.clipboard.writeText(password);
    passwordref.current.select();
  };
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center  bg-slate-50">
        <div className="w-600 p-4 flex-col flex gap-10 justify-center items-center bg-green-600 shadow-md ">
          <div className="display flex w-full justify-center">
            <input
              type="text"
              readOnly
              value={password}
              ref={passwordref}
              className="bg-slate-300  p-1 "
            />
            <button
              onClick={copyToClipbord}
              className="bg-sky-400 text-white p-1"
            >
              Copy
            </button>
          </div>
          <div className="actions flex gap-5">
            <div className="range flex gap-3">
              <input
                type="range"
                min={8}
                max={50}
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
              <label htmlFor="">Length {length}</label>
            </div>
            <div className="number_allow flex gap-2">
              <input
                type="checkbox"
                defaultChecked={numberAllow}
                onChange={() => setNumberAllow(!numberAllow)}
              />
              <label htmlFor="">NumberAllow</label>
            </div>
            <div className="Char_allow flex gap-2">
              <input
                type="checkbox"
                defaultChecked={charAllow}
                onChange={() => setCharAllow(!charAllow)}
              />
              <label htmlFor="">Charector Allow</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
