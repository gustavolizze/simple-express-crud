module.exports = (app) => {
    app.get('/', (req, res) => {
        return res.status(200).json({
            message: 'Server OK !'
        });
    });
}