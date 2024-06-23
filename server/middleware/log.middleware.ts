import morgan from "morgan";

export default defineEventHandler((event) =>{
    if(!event.path.includes('/api/'))return
    const logger = morgan('dev')

    logger(event.node.req,event.node.res, function(){})
})