const apiFetch = (url, body={}) => 
  fetch(url,
    {          
      body: JSON.stringify(body),
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    .then(res => res.json())
    .catch(err => console.error(err));

export default apiFetch;
