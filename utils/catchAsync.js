module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => {
            res.redirect('/500');
        });
    };
};