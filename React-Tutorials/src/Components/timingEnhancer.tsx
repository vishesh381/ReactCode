export const timingEnhancer = (createStore: any) => (...args: any[]) => {
  const store = createStore(...args);
  const originalDispatch = store.dispatch;

  store.dispatch = (action: any) => {
    const start = performance.now();
    const result = originalDispatch(action);
    const end = performance.now();
    console.log(`[Enhancer] Action "${action.type}" processed in ${end - start}ms`);
    return result;
  };

  return store;
};
