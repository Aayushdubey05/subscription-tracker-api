//how middlwares works in express
//create a subscription -> middlware (check for renewal date) -> middleware (check for error) -> next() -> controller (create subscription) -> response
const errorMiddleware = (err, req, res, next) => {
    try{
        let error = { ...err};

        error.message = err.message;

        console.error(err); 

        // Mongoose bad ObjectId error
        if(err.name === 'CastError'){
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode = 404;
        }

        // Mongoose Duplicate key error
        if(err.name === 'MongoServerError' && err.code === 11000){
            const message = 'Duplicate field value entered';
            error = new Error(message);
            error.statusCode = 400;
        }

        // Mongoose Validation error
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(val => val.message).join(', ');
            error = new Error(message);
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || 'server error'
        })
    }
    catch(error){
        next(error);
    }
};


export default errorMiddleware;