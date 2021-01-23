// export const generateRoomNumber = () => Math.floor(100000 + Math.random() * 900000)

export const multiSet = (obj, data) => {
    Object.keys(data).forEach(key => {
        obj.set(key, data[key])
    })
    return obj
}