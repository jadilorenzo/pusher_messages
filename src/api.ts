export const get = async (part: string) => {
    return await fetch(`http://192.168.1.16:8080/${part}`)
        .then((r) => {
            const response = r.json()
            console.log('API', part, response)
            return response
        })
}

export const post = async (part: string, json: any) => {
    return await fetch(`http://192.168.1.16:8080/${part}/`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json, */*',
        },
        body: JSON.stringify(json)
    })
        .then((r) => {
            const response = r.json()
            console.log('API', part, response)
            return response
        })
}