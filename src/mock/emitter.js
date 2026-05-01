import { startEventStream } from './mock/emitter';
import events from './mock/fixtures/run_error';

useEffect(() => {
  const stop = startEventStream(events, (event) => {
    dispatch({ type: 'ADD_EVENT', payload: event });
  });
  return stop;
}, []);