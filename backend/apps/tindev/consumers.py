import json
from channels.generic.websocket import AsyncWebsocketConsumer


class TindevConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        '''Connect websocket'''
        self.room_name = self.scope['url_route']['kwargs']['user_id']
        self.room_group_name = f'room_{ self.room_name }'

        # print(self.channel_layer.__dict__)

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
        print('Connected')

    async def disconnect(self, close_code):
        '''Disconnect websocket'''
        print('Disconnected')
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        '''
        Receive message from WebSocket.
        Get the event and send the appropriate event
        '''
        response = json.loads(text_data)
        event = response.get('event', None)
        message = response.get('message', None)

        # if event == 'MOVE':
        #     # Send message to room group
        #     await self.channel_layer.group_send(self.room_group_name, {
        #         'type': 'send_message',
        #         'message': message,
        #         'event': 'MOVE'
        #     })

    async def send_message(self, res):
        ''' Receive message from room group '''
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'payload': res,
        }))