import create from 'zustand';
import {devtools} from 'zustand/middleware';

let store = (set) => ({
    room: {},
    setRoom: (room) => set({room}),
    roomList: [],
    setRoomList: (roomList) => set({roomList})
});

store = devtools(store);
export const useStore = create(store);