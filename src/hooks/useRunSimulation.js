import { useReducer, useRef, useEffect } from "react";
import runReducer, { initialState } from "../state/runReducer";
import runSuccess from "../mock/fixtures/run_success";

export default function useRunSimulation() {
  const [state, dispatch] = useReducer(runReducer, initialState);
  const timersRef = useRef([]);

  function clearTimers() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }

  function startRun() {
    clearTimers();
    dispatch({ type: "RESET" });

    runSuccess.forEach((event, index) => {
      const delay = index * 800;

      const id = setTimeout(() => {
        dispatch({ type: event.type, payload: event });
      }, delay);

      timersRef.current.push(id);
    });
  }

  // cleanup on unmount
  useEffect(() => {
    return () => clearTimers();
  }, []);

  return { state, startRun };
}