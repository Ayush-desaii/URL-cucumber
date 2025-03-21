import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    shortId: { type: String, required: true, unique: true },
    originalUrl: { type: String, required: true },
    clicks: { type: Number, default: 0 },
    expiresAt: { type: Date, default: null }
});

export default mongoose.model('Url', urlSchema);
