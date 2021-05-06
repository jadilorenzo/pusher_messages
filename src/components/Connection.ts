import Pusher from 'pusher-js'
import {post, get} from '../api'

const pusher = new Pusher('922ac30666e5c94d5e7a', {
    cluster: 'us2',
})

export default class Connection {
    channel: any
    channelName: string
    constructor(channel: string, subChannel: string, callback?: any) {
        this.channelName = channel
        this.channel = pusher.subscribe(`${channel}`)
        if (callback) this.channel.bind(subChannel, callback)

        post(`${channel}_init`, {}) 
    }
    
    create(item: any) {
        return post(`${this.channelName}_create`, item)
    }

    get(item: any) {
        return get(`${item}s_get`)
    }
}