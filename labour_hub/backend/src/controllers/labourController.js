export const getAllLabours = async (req, res) => {
    try {
        const db = await connection();
        const labours = await db.collection("labour").find().toArray();
        res.json(labours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};