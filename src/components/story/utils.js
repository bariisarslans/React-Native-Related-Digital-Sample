import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'seen'

export const dots = (str,len) => {
    if (str.length > len) {
        return str.substr(0,len)+"..."
    }
    return str
}

export const seen = (index) => {
    getSeenList().then(val => {
        let arr = (NUSC(val) ? [] : val.split(","));
        
        arr.indexOf(index) < 0 && (
            arr.push(index),
            setSeenList(arr)
        )
    })
}

export const getSeenList = async () => {
    return await AsyncStorage.getItem(key);
}

export const setSeenList = (arr) => {
    if (!arr)
        var arr=[]

    AsyncStorage.setItem(key, arr.toString());
}

export const returnSeenStories = async (obj) => {
    if (!obj)
        var obj= {}

    getSeenList().then(keys => {
        if(NUSC(keys))
            return false
        
        keys.split(",")
        obj.forEach(story => {
            if (keys.indexOf(story.key) >= 0 ) {
                story.seen = true
            }
        });
    })

    return obj
}

export const clearSeenList = () => {
    AsyncStorage.setItem(key, "");
    return "Success clean";
}

export const NUSC = (str) => {
    if (str === null || str === undefined || str === "") {
        return true
    }
    return false
}

export const fetchWithCallback = (url, method = 'GET', data, callback) => {
    const options = {
        method,
        'Content-Type': 'application/json'
    }

    if (method === 'POST' && data) {
        options.body = JSON.stringify(data)
    }

    if(!callback || typeof callback !== 'function') {
        callback = () => {}
    }

    fetch(url, options)
        .then(res => { 
            callback(res)
        })
        .catch(err => {
            callback(err)
        })
}