import { test, expect } from '@playwright/test'
import { authToken } from '../helpers/auth-token'
import { createRoom } from '../helpers/create-room'

test('edit rooms data from admin API and check if it changed', async ({request}) => {
    const token = await authToken(request)
    const roomId = await createRoom(request)

    await request.put(`https://automationintesting.online/api/room/${roomId}`, {
        headers: {
            'Content-type': 'application/json',
            'Cookie': `token=${token}`
        },
        data : {
            "roomid":`${roomId}`,
            "roomName":"Test11",
            "type":"Single",
            "accessible":true,
            "image":"/images/room3.jpg",
            "description":"Test",
            "features":["WiFi","TV","Radio"],
            "roomPrice":32,
            "featuresObject":{
                "WiFi":true,
                "TV":true,
                "Radio":true,
                "Refreshments":false,
                "Safe":false,
                "Views":false}
        }
    })

    const roomResponse = await request.get('https://automationintesting.online/api/room')
    const rooms = await roomResponse.json()

    const updatedRoom = rooms.rooms.find(
        (room: any) => room.roomName === 'Test11'
    )
    
    expect(updatedRoom).toBeTruthy()
})