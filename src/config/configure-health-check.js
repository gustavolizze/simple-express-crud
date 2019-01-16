module.exports = (app) => {
    app.get('/health-check', (req, res) => {
        return res.status(200).json({
            message: 'Server OK !'
        });
    });
}