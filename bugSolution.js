The solution uses `AbortController` to manage the asynchronous operation:

```javascript
useEffect(() => {
  const controller = new AbortController();
  const signal = controller.signal;

  const fetchData = async () => {
    try {
      const response = await fetch('some-url', { signal });
      setData(await response.json());
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Fetch error:', error);
      }
    }
  };

  fetchData();

  return () => {
    controller.abort();
  };
}, []);
```

This improved code creates an `AbortController` and provides its signal to the fetch call. The `useEffect`'s cleanup function calls `controller.abort()`, ensuring the request is stopped when the component unmounts. The `try...catch` block handles the `AbortError` specifically, preventing it from causing an error message.