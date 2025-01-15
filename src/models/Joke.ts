import { Schema, model, Document } from 'mongoose';

export interface IJoke extends Document {
  text: string;
  author?: string;
  rating: number;
  category: 'Dad joke' | 'Humor Negro' | 'Chistoso' | 'Malo';
}

const JokeSchema = new Schema<IJoke>({
  text: { type: String, required: true },
  author: { type: String, default: 'Se perdió en el Ávila como Led' },
  rating: { type: Number, required: true },
  category: { type: String, enum: ['Dad joke', 'Humor Negro', 'Chistoso', 'Malo'], required: true }
});

export default model<IJoke>('Joke', JokeSchema);