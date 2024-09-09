export type Cursor = {
  id: string
  color: string
  position: {
    x: number;
    y: number;
  };
};

export type ServerToClientEvents = {
  cursor_updates: (cursors: Cursor[]) => void;
};

export type ClientToServerEvents = {
  cursor_receiver: (cursor: Omit<Cursor, 'id' | 'color'>) => void;
};
