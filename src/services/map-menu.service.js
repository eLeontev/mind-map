export let getMaps = () => fetch('/rest/v1/maps/', {
    method: 'GET'
}).then(res => res.json());

export let createNewMap = (mapLabel) => new Promise((res) => res(mapLabel));
