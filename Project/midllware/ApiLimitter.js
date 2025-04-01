// The Map object holds key-value pairs and remembers the original insertion order of the keys. 
const requestcounts=new Map();
const window=60000;// 1min window
const maxRequest=10;

exports.Apilimitter=(req,res,next)=>{
 const ip=req.socket.remoteAddress;
 const currenttime=Math.floor(Date.now() / 1000);
 if(!requestcounts.has(ip)){
    requestcounts.set(ip,[]);
 }
 console.log(requestcounts.has(ip))

 //filtering out timetsamp olderthan window size
 const filterCounts=requestcounts.get(ip).filter((time)=>currenttime-time<window);
 console.log(`IP: ${ip} | Requests in window: ${filterCounts.length}`);
 if(filterCounts>maxRequest){
    res.writeHead(429,{'Content-Type':'text/plain'});
    res.end("Too many request please try again later");
    return false
 }
 filterCounts.push(currenttime)
 console.log(filterCounts)
 requestcounts.set(ip,filterCounts)
 next()
}