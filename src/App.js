import { useRef, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie] = useCookies(['acts'])
  const [names, setNames] = useState([])
  const activity = useRef()

  useEffect(() => {
    setNames(cookies.acts)
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setCookie('acts', JSON.stringify(names), { path: '/', expires: new Date(Date.now()+2592000) });
  }, [names]); // eslint-disable-line react-hooks/exhaustive-deps

  const add = () => {
    if (activity.current.value && !names.includes(activity.current.value)) {
      setNames([...names, activity.current.value]);
      activity.current.value = '';
    }
  }

  return (
    <div className="note">
      <div className="topbar">
        <input className="add" type="text" placeholder="Note here" ref={activity} autoComplete="off" />
        <button className="btn" onClick={() => add()}>
          <span className="material-icons-outlined">add</span>
        </button>
      </div>
      {names.length === 0 ? <p className="empty">Your note is empty</p> :
      names.map(name => 
        <div className="box">
            <p className="text">{name}</p>
            <button className="btn" onClick={() => setNames(names.filter(name1 => name1 !== name))}>
              <span className="material-icons-outlined">delete</span>
            </button>
        </div>
      )}
    </div>
  );
}

export default App;
