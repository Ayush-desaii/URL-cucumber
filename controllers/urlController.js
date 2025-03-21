import Url from '../models/urlModel.js';
import { nanoid } from 'nanoid';

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

// ✅ Shorten a URL
export const createShortUrl = async (req, res) => {
    const { url, expiry } = req.body;

    console.log(".....cont........")
    
    if (!url) return res.status(400).json({ error: "URL is required" });

    const shortId = nanoid(6);
    const expiresAt = expiry ? new Date(Date.now() + expiry * 1000) : null;

    const shortUrl = await Url.create({ shortId, originalUrl: url, expiresAt });

    res.json({ shortUrl: `${BASE_URL}/api/url/${shortId}` });
};

// ✅ Redirect to the original URL
export const redirectUrl = async (req, res) => {
    const { shortId } = req.params;

    console.log(".....cont........")

    
    const shortUrl = await Url.findOne({ shortId });

    if (!shortUrl) return res.status(404).json({ error: "Short URL not found" });

    if (shortUrl.expiresAt && new Date() > shortUrl.expiresAt) {
        return res.status(410).json({ error: "URL expired" });
    }

    shortUrl.clicks++;
    await shortUrl.save();

    res.redirect(shortUrl.originalUrl);
};

// ✅ Get URL statistics
export const getStats = async (req, res) => {
    const { shortId } = req.params;

    console.log(".....cont........")


    const shortUrl = await Url.findOne({ shortId });
    if (!shortUrl) return res.status(404).json({ error: "Short URL not found" });

    res.json({ originalUrl: shortUrl.originalUrl, clicks: shortUrl.clicks });
};
