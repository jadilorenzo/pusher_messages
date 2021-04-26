export const get = async (part: string) => {
    return await fetch(`http://127.0.0.1:8000/get/${part}`)
        .then((r) => {
            const response = r.json()
            console.log(response)
            return response
        })
}

export const post = async (part: string, json: any) => {
    return await fetch(`http://127.0.0.1:8000/${part}/`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json, */*',
        },
        body: JSON.stringify(json)
    })
        .then((r) => {
            const response = r.json()
            console.log("API", part, response)
            return response
        })
}